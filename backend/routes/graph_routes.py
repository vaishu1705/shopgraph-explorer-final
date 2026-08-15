from fastapi import APIRouter
from db.cognodb import driver

router = APIRouter(
    prefix="/api/graph",
    tags=["Graph"]
)


@router.get("/{user_id}")
def get_graph(user_id: int):

    query = """
    MATCH (u:User {id: $user_id})

    OPTIONAL MATCH (u)-[user_rel:PURCHASED|VIEWED|LIKED]->(p:Product)

    WITH
        u,
        collect(DISTINCT p) AS products,
        collect(DISTINCT user_rel) AS user_relationships

    UNWIND products AS product

    OPTIONAL MATCH (product)-[
        product_rel:SIMILAR_TO|
        COMPLEMENTARY_TO|
        BELONGS_TO|
        MADE_BY|
        HAS_FEATURE
    ]->(connected)

    WITH
        u,
        products,
        user_relationships,
        collect(DISTINCT connected) AS connected_nodes,
        collect(DISTINCT product_rel) AS product_relationships

    WITH
        [u] +
        [p IN products WHERE p IS NOT NULL] +
        [n IN connected_nodes WHERE n IS NOT NULL] AS all_nodes,

        [r IN user_relationships WHERE r IS NOT NULL] +
        [r IN product_relationships WHERE r IS NOT NULL] AS all_relationships

    UNWIND all_nodes AS n

    WITH
        collect(DISTINCT {
            id: elementId(n),
            labels: labels(n),
            properties: properties(n)
        }) AS nodes,
        all_relationships

    UNWIND all_relationships AS r

    RETURN
        nodes,
        collect(DISTINCT {
            id: elementId(r),
            type: type(r),
            source: elementId(startNode(r)),
            target: elementId(endNode(r)),
            properties: properties(r)
        }) AS relationships
    """

    with driver.session() as session:

        result = session.run(
            query,
            user_id=user_id
        )

        record = result.single()

    if record is None:
        return {
            "user_id": user_id,
            "nodes": [],
            "relationships": []
        }

    return {
        "user_id": user_id,
        "nodes": record["nodes"],
        "relationships": record["relationships"]
    }