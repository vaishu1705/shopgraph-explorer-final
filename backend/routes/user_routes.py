from fastapi import APIRouter, HTTPException
from db.cognodb import driver


router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)


# =========================================================
# GET USER PROFILE
# =========================================================

@router.get("/{user_id}")
def get_user(user_id: int):

    query = """
    MATCH (u:User {id: $user_id})

    OPTIONAL MATCH (u)-[:PURCHASED]->(p:Product)
    OPTIONAL MATCH (p)-[:BELONGS_TO]->(c:Category)

    WITH
        u,
        collect(DISTINCT c.name) AS categories

    OPTIONAL MATCH (u)-[:PURCHASED]->(p2:Product)
    OPTIONAL MATCH (p2)-[:MADE_BY]->(b:Brand)

    WITH
        u,
        categories,
        collect(DISTINCT b.name) AS brands

    RETURN
        u.id AS id,
        u.name AS name,
        u.email AS email,
        categories,
        brands
    """

    with driver.session() as session:
        record = session.run(
            query,
            user_id=user_id
        ).single()

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    categories = [
        category
        for category in record["categories"]
        if category is not None
    ]

    brands = [
        brand
        for brand in record["brands"]
        if brand is not None
    ]

    name = record["name"] or "User"

    initials = "".join(
        word[0].upper()
        for word in name.split()
        if word
    )[:2]

    interests = [
        f"Interested in {category}"
        for category in categories
    ]

    return {
        "id": record["id"],
        "name": name,
        "email": record["email"],
        "avatarInitials": initials,
        "favoriteCategories": categories,
        "favoriteBrands": brands,
        "interests": interests
    }


# =========================================================
# GET USER ACTIVITY
# =========================================================

@router.get("/{user_id}/activity")
def get_user_activity(user_id: int):

    query = """
    MATCH (u:User {id: $user_id})

    OPTIONAL MATCH (u)-[:PURCHASED]->(p1:Product)

    WITH
        u,
        collect(DISTINCT {
            type: "PURCHASED",
            product: CASE
                WHEN p1 IS NULL THEN NULL
                ELSE {
                    id: p1.id,
                    name: p1.name,
                    price: p1.price,
                    rating: p1.rating
                }
            END
        }) AS purchased

    OPTIONAL MATCH (u)-[:VIEWED]->(p2:Product)

    WITH
        u,
        purchased,
        collect(DISTINCT {
            type: "VIEWED",
            product: CASE
                WHEN p2 IS NULL THEN NULL
                ELSE {
                    id: p2.id,
                    name: p2.name,
                    price: p2.price,
                    rating: p2.rating
                }
            END
        }) AS viewed

    OPTIONAL MATCH (u)-[:LIKED]->(p3:Product)

    RETURN
        purchased,
        viewed,
        collect(DISTINCT {
            type: "LIKED",
            product: CASE
                WHEN p3 IS NULL THEN NULL
                ELSE {
                    id: p3.id,
                    name: p3.name,
                    price: p3.price,
                    rating: p3.rating
                }
            END
        }) AS liked
    """

    with driver.session() as session:
        record = session.run(
            query,
            user_id=user_id
        ).single()

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    def clean(entries):

        result = []

        for entry in entries:

            if entry["product"] is not None:
                result.append(entry)

        return result

    return {
        "purchased": clean(record["purchased"]),
        "viewed": clean(record["viewed"]),
        "liked": clean(record["liked"])
    }


# =========================================================
# GET USER STATISTICS
# =========================================================

@router.get("/{user_id}/stats")
def get_user_stats(user_id: int):

    query = """
    MATCH (u:User {id: $user_id})

    OPTIONAL MATCH (u)-[:PURCHASED]->(p1:Product)

    WITH
        u,
        count(DISTINCT p1) AS purchased

    OPTIONAL MATCH (u)-[:VIEWED]->(p2:Product)

    WITH
        u,
        purchased,
        count(DISTINCT p2) AS viewed

    OPTIONAL MATCH (u)-[:LIKED]->(p3:Product)

    WITH
        purchased,
        viewed,
        count(DISTINCT p3) AS liked

    RETURN
        purchased,
        viewed,
        liked
    """

    with driver.session() as session:
        record = session.run(
            query,
            user_id=user_id
        ).single()

    if record is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "purchased": record["purchased"],
        "viewed": record["viewed"],
        "liked": record["liked"],

        # Current recommendation endpoint provides
        # recommendation results separately.
        "recommendations": 12
    }