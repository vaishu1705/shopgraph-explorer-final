from fastapi import APIRouter
from db.cognodb import driver

router = APIRouter(
    prefix="/api/recommendations",
    tags=["Recommendations"]
)


@router.get("/{user_id}")
def get_recommendations(user_id: int):

    query = """
    MATCH (u:User {id: $user_id})-[:PURCHASED]->(p:Product)
    MATCH (p)-[:COMPLEMENTARY_TO|SIMILAR_TO]->(recommended:Product)

    OPTIONAL MATCH (recommended)-[:MADE_BY]->(brand:Brand)
    OPTIONAL MATCH (recommended)-[:BELONGS_TO]->(category:Category)

    WHERE NOT (u)-[:PURCHASED]->(recommended)

    WITH
        recommended,
        brand,
        category,
        count(DISTINCT p) AS connection_count

    RETURN
        recommended.id AS product_id,
        recommended.name AS name,
        brand.name AS brand,
        category.name AS category,
        recommended.price AS price,
        recommended.rating AS rating,
        connection_count
    ORDER BY connection_count DESC, recommended.rating DESC
    LIMIT 10
    """

    with driver.session() as session:
        result = session.run(
            query,
            user_id=user_id
        )

        recommendations = []

        for record in result:
            data = record.data()

            score = min(
                99,
                70 + data["connection_count"] * 10
            )

            data["score"] = score

            data["reason"] = (
                "This product is connected to products "
                "you previously purchased."
            )

            data["relationship"] = (
                "COMPLEMENTARY_OR_SIMILAR"
            )

            recommendations.append(data)

    return {
        "user_id": user_id,
        "count": len(recommendations),
        "recommendations": recommendations
    }


@router.get("/{user_id}/reasons")
def get_recommendation_reasons(user_id: int):

    query = """
    MATCH (u:User {id: $user_id})-[:PURCHASED]->(p:Product)
    MATCH (p)-[r:COMPLEMENTARY_TO|SIMILAR_TO]->(recommended:Product)

    WHERE NOT (u)-[:PURCHASED]->(recommended)

    RETURN
        p.name AS source_product,
        type(r) AS relationship,
        recommended.id AS product_id,
        recommended.name AS recommended_product

    ORDER BY source_product
    LIMIT 20
    """

    with driver.session() as session:
        result = session.run(
            query,
            user_id=user_id
        )

        reasons = [record.data() for record in result]

    return {
        "user_id": user_id,
        "reasons": reasons
    }