from fastapi import APIRouter, HTTPException
from db.cognodb import driver

router = APIRouter(
    prefix="/api/products",
    tags=["Products"]
)


# ---------------------------------------------------------
# Helper: convert a Neo4j product record into API data
# ---------------------------------------------------------

def product_data(record):
    return {
        "id": record["id"],
        "name": record["name"],
        "brand": record["brand"],
        "category": record["category"],
        "price": record["price"],
        "rating": record["rating"],
    }


# ---------------------------------------------------------
# GET /api/products
# ---------------------------------------------------------

@router.get("")
def get_products():

    query = """
    MATCH (p:Product)-[:MADE_BY]->(b:Brand)
    MATCH (p)-[:BELONGS_TO]->(c:Category)

    RETURN
        p.id AS id,
        p.name AS name,
        b.name AS brand,
        c.name AS category,
        p.price AS price,
        p.rating AS rating

    ORDER BY p.id
    """

    with driver.session() as session:
        result = session.run(query)
        products = [record.data() for record in result]

    return {
        "count": len(products),
        "products": products
    }


# ---------------------------------------------------------
# GET /api/products/{product_id}
# ---------------------------------------------------------

@router.get("/{product_id}")
def get_product(product_id: int):

    query = """
    MATCH (p:Product {id: $product_id})

    OPTIONAL MATCH (p)-[:MADE_BY]->(b:Brand)
    OPTIONAL MATCH (p)-[:BELONGS_TO]->(c:Category)

    RETURN
        p.id AS id,
        p.name AS name,
        b.name AS brand,
        c.name AS category,
        p.price AS price,
        p.rating AS rating
    """

    with driver.session() as session:
        record = session.run(
            query,
            product_id=product_id
        ).single()

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product_data(record)


# ---------------------------------------------------------
# GET /api/products/{product_id}/similar
# ---------------------------------------------------------

@router.get("/{product_id}/similar")
def get_similar_products(
    product_id: int,
    count: int = 4
):

    query = """
    MATCH (p:Product {id: $product_id})

    MATCH (p)-[:SIMILAR_TO]-(related:Product)

    OPTIONAL MATCH (related)-[:MADE_BY]->(b:Brand)
    OPTIONAL MATCH (related)-[:BELONGS_TO]->(c:Category)

    RETURN DISTINCT
        related.id AS id,
        related.name AS name,
        b.name AS brand,
        c.name AS category,
        related.price AS price,
        related.rating AS rating

    ORDER BY related.rating DESC, related.id

    LIMIT $count
    """

    with driver.session() as session:
        result = session.run(
            query,
            product_id=product_id,
            count=count
        )

        products = [
            product_data(record)
            for record in result
        ]

    return {
        "count": len(products),
        "products": products
    }


# ---------------------------------------------------------
# GET /api/products/{product_id}/complementary
# ---------------------------------------------------------

@router.get("/{product_id}/complementary")
def get_complementary_products(
    product_id: int,
    count: int = 5
):

    query = """
    MATCH (p:Product {id: $product_id})

    MATCH (p)-[:COMPLEMENTARY_TO]-(related:Product)

    OPTIONAL MATCH (related)-[:MADE_BY]->(b:Brand)
    OPTIONAL MATCH (related)-[:BELONGS_TO]->(c:Category)

    RETURN DISTINCT
        related.id AS id,
        related.name AS name,
        b.name AS brand,
        c.name AS category,
        related.price AS price,
        related.rating AS rating

    ORDER BY related.rating DESC, related.id

    LIMIT $count
    """

    with driver.session() as session:
        result = session.run(
            query,
            product_id=product_id,
            count=count
        )

        products = [
            product_data(record)
            for record in result
        ]

    return {
        "count": len(products),
        "products": products
    }


# ---------------------------------------------------------
# GET /api/products/{product_id}/also-bought
# ---------------------------------------------------------

@router.get("/{product_id}/also-bought")
def get_also_bought_products(
    product_id: int,
    count: int = 4
):

    query = """
    MATCH (target:Product {id: $product_id})

    MATCH (u:User)-[:PURCHASED]->(target)

    MATCH (u)-[:PURCHASED]->(related:Product)

    WHERE related.id <> target.id

    OPTIONAL MATCH (related)-[:MADE_BY]->(b:Brand)
    OPTIONAL MATCH (related)-[:BELONGS_TO]->(c:Category)

    WITH
        related,
        b,
        c,
        count(DISTINCT u) AS buyers

    RETURN
        related.id AS id,
        related.name AS name,
        b.name AS brand,
        c.name AS category,
        related.price AS price,
        related.rating AS rating

    ORDER BY buyers DESC, related.rating DESC, related.id

    LIMIT $count
    """

    with driver.session() as session:
        result = session.run(
            query,
            product_id=product_id,
            count=count
        )

        products = [
            product_data(record)
            for record in result
        ]

    return {
        "count": len(products),
        "products": products
    }