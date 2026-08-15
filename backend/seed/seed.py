import sys
from pathlib import Path

# Allow seed.py to import the db package from backend/
sys.path.append(str(Path(__file__).resolve().parents[1]))

from db.cognodb import driver


# ---------------------------------------------------------
# SHOPGRAPH SEED DATA
# ---------------------------------------------------------

users = [
    {"id": 1, "name": "Vaishnavi", "email": "vaishnavi@example.com"},
    {"id": 2, "name": "Aarav", "email": "aarav@example.com"},
    {"id": 3, "name": "Ananya", "email": "ananya@example.com"},
    {"id": 4, "name": "Rahul", "email": "rahul@example.com"},
    {"id": 5, "name": "Sneha", "email": "sneha@example.com"},
    {"id": 6, "name": "Rohan", "email": "rohan@example.com"},
    {"id": 7, "name": "Priya", "email": "priya@example.com"},
    {"id": 8, "name": "Karthik", "email": "karthik@example.com"},
    {"id": 9, "name": "Meera", "email": "meera@example.com"},
    {"id": 10, "name": "Arjun", "email": "arjun@example.com"},
    {"id": 11, "name": "Diya", "email": "diya@example.com"},
    {"id": 12, "name": "Vikram", "email": "vikram@example.com"},
    {"id": 13, "name": "Ishita", "email": "ishita@example.com"},
    {"id": 14, "name": "Aditya", "email": "aditya@example.com"},
    {"id": 15, "name": "Neha", "email": "neha@example.com"},
    {"id": 16, "name": "Manish", "email": "manish@example.com"},
    {"id": 17, "name": "Pooja", "email": "pooja@example.com"},
    {"id": 18, "name": "Sanjay", "email": "sanjay@example.com"},
    {"id": 19, "name": "Kavya", "email": "kavya@example.com"},
    {"id": 20, "name": "Nikhil", "email": "nikhil@example.com"},
]


categories = [
    "Laptops",
    "Smartphones",
    "Audio",
    "Mice",
    "Keyboards",
    "Monitors",
    "Tablets",
    "Smart Devices",
    "Accessories",
    "Gaming",
]


brands = [
    "Lenovo",
    "Apple",
    "Samsung",
    "Sony",
    "Logitech",
    "Keychron",
    "Dell",
    "Anker",
    "HP",
    "JBL",
]


products = [
    # Laptops
    {
        "id": 1,
        "name": "Lenovo IdeaPad Slim 5",
        "brand": "Lenovo",
        "category": "Laptops",
        "price": 64999,
        "rating": 4.6,
        "features": ["16GB RAM", "512GB SSD", "Ryzen 7"],
    },
    {
        "id": 2,
        "name": "Lenovo ThinkPad E14",
        "brand": "Lenovo",
        "category": "Laptops",
        "price": 72999,
        "rating": 4.7,
        "features": ["16GB RAM", "512GB SSD", "Business"],
    },
    {
        "id": 3,
        "name": "HP Pavilion 14",
        "brand": "HP",
        "category": "Laptops",
        "price": 61999,
        "rating": 4.5,
        "features": ["16GB RAM", "512GB SSD", "Intel i5"],
    },
    {
        "id": 4,
        "name": "Dell Inspiron 15",
        "brand": "Dell",
        "category": "Laptops",
        "price": 67999,
        "rating": 4.5,
        "features": ["16GB RAM", "512GB SSD", "Intel i5"],
    },
    {
        "id": 5,
        "name": "MacBook Air M3",
        "brand": "Apple",
        "category": "Laptops",
        "price": 109999,
        "rating": 4.9,
        "features": ["8GB RAM", "256GB SSD", "Apple Silicon"],
    },

    # Smartphones
    {
        "id": 6,
        "name": "iPhone 15",
        "brand": "Apple",
        "category": "Smartphones",
        "price": 69999,
        "rating": 4.8,
        "features": ["5G", "48MP Camera", "OLED"],
    },
    {
        "id": 7,
        "name": "iPhone 15 Pro",
        "brand": "Apple",
        "category": "Smartphones",
        "price": 119999,
        "rating": 4.9,
        "features": ["5G", "Pro Camera", "Titanium"],
    },
    {
        "id": 8,
        "name": "Samsung Galaxy S24",
        "brand": "Samsung",
        "category": "Smartphones",
        "price": 79999,
        "rating": 4.8,
        "features": ["5G", "AI Features", "AMOLED"],
    },
    {
        "id": 9,
        "name": "Samsung Galaxy A55",
        "brand": "Samsung",
        "category": "Smartphones",
        "price": 39999,
        "rating": 4.6,
        "features": ["5G", "50MP Camera", "AMOLED"],
    },
    {
        "id": 10,
        "name": "Samsung Galaxy S24 Ultra",
        "brand": "Samsung",
        "category": "Smartphones",
        "price": 129999,
        "rating": 4.9,
        "features": ["5G", "200MP Camera", "S Pen"],
    },

    # Audio
    {
        "id": 11,
        "name": "Sony WH-1000XM5",
        "brand": "Sony",
        "category": "Audio",
        "price": 29999,
        "rating": 4.8,
        "features": ["Noise Cancellation", "Wireless", "30 Hour Battery"],
    },
    {
        "id": 12,
        "name": "Sony WF-1000XM5",
        "brand": "Sony",
        "category": "Audio",
        "price": 24999,
        "rating": 4.7,
        "features": ["Noise Cancellation", "Wireless", "Earbuds"],
    },
    {
        "id": 13,
        "name": "JBL Live 660NC",
        "brand": "JBL",
        "category": "Audio",
        "price": 9999,
        "rating": 4.5,
        "features": ["Noise Cancellation", "Wireless", "40 Hour Battery"],
    },
    {
        "id": 14,
        "name": "JBL Tune 770NC",
        "brand": "JBL",
        "category": "Audio",
        "price": 7999,
        "rating": 4.4,
        "features": ["Noise Cancellation", "Wireless", "70 Hour Battery"],
    },
    {
        "id": 15,
        "name": "Sony SRS-XB100",
        "brand": "Sony",
        "category": "Audio",
        "price": 4499,
        "rating": 4.6,
        "features": ["Bluetooth", "Portable", "Water Resistant"],
    },

    # Mice
    {
        "id": 16,
        "name": "Logitech MX Master 3S",
        "brand": "Logitech",
        "category": "Mice",
        "price": 8495,
        "rating": 4.7,
        "features": ["Wireless", "Ergonomic", "Multi Device"],
    },
    {
        "id": 17,
        "name": "Logitech Pebble M350",
        "brand": "Logitech",
        "category": "Mice",
        "price": 1999,
        "rating": 4.4,
        "features": ["Wireless", "Silent Click", "Portable"],
    },
    {
        "id": 18,
        "name": "Logitech G502 X",
        "brand": "Logitech",
        "category": "Mice",
        "price": 7999,
        "rating": 4.6,
        "features": ["Gaming", "Wired", "High DPI"],
    },
    {
        "id": 19,
        "name": "Logitech Lift Vertical Mouse",
        "brand": "Logitech",
        "category": "Mice",
        "price": 5999,
        "rating": 4.5,
        "features": ["Wireless", "Ergonomic", "Silent Click"],
    },
    {
        "id": 20,
        "name": "HP Wireless Mouse 250",
        "brand": "HP",
        "category": "Mice",
        "price": 1299,
        "rating": 4.3,
        "features": ["Wireless", "Portable", "Silent Click"],
    },

    # Keyboards
    {
        "id": 21,
        "name": "Keychron K2",
        "brand": "Keychron",
        "category": "Keyboards",
        "price": 8999,
        "rating": 4.6,
        "features": ["Mechanical", "Wireless", "RGB"],
    },
    {
        "id": 22,
        "name": "Keychron K6",
        "brand": "Keychron",
        "category": "Keyboards",
        "price": 8499,
        "rating": 4.5,
        "features": ["Mechanical", "Wireless", "Compact"],
    },
    {
        "id": 23,
        "name": "Logitech MX Keys",
        "brand": "Logitech",
        "category": "Keyboards",
        "price": 9995,
        "rating": 4.7,
        "features": ["Wireless", "Backlit", "Multi Device"],
    },
    {
        "id": 24,
        "name": "HP K500F Gaming Keyboard",
        "brand": "HP",
        "category": "Keyboards",
        "price": 2499,
        "rating": 4.3,
        "features": ["Gaming", "RGB", "Wired"],
    },
    {
        "id": 25,
        "name": "Logitech G413",
        "brand": "Logitech",
        "category": "Keyboards",
        "price": 6499,
        "rating": 4.5,
        "features": ["Mechanical", "Gaming", "Backlit"],
    },

    # Monitors
    {
        "id": 26,
        "name": "Dell 27 Monitor",
        "brand": "Dell",
        "category": "Monitors",
        "price": 24999,
        "rating": 4.5,
        "features": ["27 Inch", "4K", "IPS"],
    },
    {
        "id": 27,
        "name": "Dell UltraSharp 27",
        "brand": "Dell",
        "category": "Monitors",
        "price": 44999,
        "rating": 4.8,
        "features": ["27 Inch", "4K", "USB-C"],
    },
    {
        "id": 28,
        "name": "Samsung 27 Inch Monitor",
        "brand": "Samsung",
        "category": "Monitors",
        "price": 21999,
        "rating": 4.4,
        "features": ["27 Inch", "IPS", "75Hz"],
    },
    {
        "id": 29,
        "name": "Samsung Odyssey G5",
        "brand": "Samsung",
        "category": "Monitors",
        "price": 29999,
        "rating": 4.6,
        "features": ["Gaming", "144Hz", "QHD"],
    },
    {
        "id": 30,
        "name": "HP 24 Inch Monitor",
        "brand": "HP",
        "category": "Monitors",
        "price": 12999,
        "rating": 4.3,
        "features": ["24 Inch", "IPS", "75Hz"],
    },

    # Tablets
    {
        "id": 31,
        "name": "iPad 10th Generation",
        "brand": "Apple",
        "category": "Tablets",
        "price": 36999,
        "rating": 4.7,
        "features": ["WiFi", "10.9 Inch", "USB-C"],
    },
    {
        "id": 32,
        "name": "iPad Air M2",
        "brand": "Apple",
        "category": "Tablets",
        "price": 59999,
        "rating": 4.8,
        "features": ["M2 Chip", "11 Inch", "Apple Pencil"],
    },
    {
        "id": 33,
        "name": "Samsung Galaxy Tab S9",
        "brand": "Samsung",
        "category": "Tablets",
        "price": 69999,
        "rating": 4.8,
        "features": ["AMOLED", "S Pen", "WiFi"],
    },
    {
        "id": 34,
        "name": "Samsung Galaxy Tab A9",
        "brand": "Samsung",
        "category": "Tablets",
        "price": 15999,
        "rating": 4.4,
        "features": ["8.7 Inch", "WiFi", "Portable"],
    },
    {
        "id": 35,
        "name": "Lenovo Tab P12",
        "brand": "Lenovo",
        "category": "Tablets",
        "price": 29999,
        "rating": 4.5,
        "features": ["12.7 Inch", "Pen Support", "WiFi"],
    },

    # Smart Devices
    {
        "id": 36,
        "name": "Apple Watch Series 9",
        "brand": "Apple",
        "category": "Smart Devices",
        "price": 44999,
        "rating": 4.8,
        "features": ["GPS", "Health Tracking", "Water Resistant"],
    },
    {
        "id": 37,
        "name": "Samsung Galaxy Watch 6",
        "brand": "Samsung",
        "category": "Smart Devices",
        "price": 29999,
        "rating": 4.6,
        "features": ["GPS", "Health Tracking", "AMOLED"],
    },
    {
        "id": 38,
        "name": "Apple AirTag",
        "brand": "Apple",
        "category": "Smart Devices",
        "price": 3490,
        "rating": 4.5,
        "features": ["Bluetooth", "Tracking", "Compact"],
    },
    {
        "id": 39,
        "name": "Samsung SmartTag2",
        "brand": "Samsung",
        "category": "Smart Devices",
        "price": 2999,
        "rating": 4.4,
        "features": ["Bluetooth", "Tracking", "Water Resistant"],
    },
    {
        "id": 40,
        "name": "JBL Smart Speaker",
        "brand": "JBL",
        "category": "Smart Devices",
        "price": 5999,
        "rating": 4.4,
        "features": ["Bluetooth", "Voice Assistant", "Wireless"],
    },

    # Accessories
    {
        "id": 41,
        "name": "Anker USB-C Hub",
        "brand": "Anker",
        "category": "Accessories",
        "price": 4999,
        "rating": 4.6,
        "features": ["USB-C", "HDMI", "Multi Port"],
    },
    {
        "id": 42,
        "name": "Anker 65W Charger",
        "brand": "Anker",
        "category": "Accessories",
        "price": 3999,
        "rating": 4.7,
        "features": ["65W", "USB-C", "Fast Charging"],
    },
    {
        "id": 43,
        "name": "Anker Power Bank 20000mAh",
        "brand": "Anker",
        "category": "Accessories",
        "price": 4499,
        "rating": 4.6,
        "features": ["20000mAh", "USB-C", "Fast Charging"],
    },
    {
        "id": 44,
        "name": "Lenovo Laptop Stand",
        "brand": "Lenovo",
        "category": "Accessories",
        "price": 2999,
        "rating": 4.5,
        "features": ["Adjustable", "Aluminium", "Ergonomic"],
    },
    {
        "id": 45,
        "name": "HP Laptop Backpack",
        "brand": "HP",
        "category": "Accessories",
        "price": 2499,
        "rating": 4.4,
        "features": ["Water Resistant", "Laptop Compartment", "Travel"],
    },

    # Gaming
    {
        "id": 46,
        "name": "Logitech G435 Gaming Headset",
        "brand": "Logitech",
        "category": "Gaming",
        "price": 7999,
        "rating": 4.5,
        "features": ["Wireless", "Gaming", "Lightweight"],
    },
    {
        "id": 47,
        "name": "Logitech G305 Gaming Mouse",
        "brand": "Logitech",
        "category": "Gaming",
        "price": 3999,
        "rating": 4.6,
        "features": ["Wireless", "Gaming", "High DPI"],
    },
    {
        "id": 48,
        "name": "Samsung Odyssey Gaming Monitor",
        "brand": "Samsung",
        "category": "Gaming",
        "price": 39999,
        "rating": 4.7,
        "features": ["Gaming", "165Hz", "QHD"],
    },
    {
        "id": 49,
        "name": "Keychron Gaming Keyboard",
        "brand": "Keychron",
        "category": "Gaming",
        "price": 10999,
        "rating": 4.6,
        "features": ["Mechanical", "RGB", "Gaming"],
    },
    {
        "id": 50,
        "name": "JBL Quantum Gaming Headset",
        "brand": "JBL",
        "category": "Gaming",
        "price": 6999,
        "rating": 4.5,
        "features": ["Gaming", "Surround Sound", "Wired"],
    },
]


# ---------------------------------------------------------
# DATABASE FUNCTIONS
# ---------------------------------------------------------

def clear_database(tx):
    tx.run("MATCH (n) DETACH DELETE n")


def create_constraints(tx):
    queries = [
        """
        CREATE CONSTRAINT user_id_unique IF NOT EXISTS
        FOR (u:User) REQUIRE u.id IS UNIQUE
        """,
        """
        CREATE CONSTRAINT product_id_unique IF NOT EXISTS
        FOR (p:Product) REQUIRE p.id IS UNIQUE
        """,
        """
        CREATE CONSTRAINT category_name_unique IF NOT EXISTS
        FOR (c:Category) REQUIRE c.name IS UNIQUE
        """,
        """
        CREATE CONSTRAINT brand_name_unique IF NOT EXISTS
        FOR (b:Brand) REQUIRE b.name IS UNIQUE
        """,
        """
        CREATE CONSTRAINT feature_name_unique IF NOT EXISTS
        FOR (f:Feature) REQUIRE f.name IS UNIQUE
        """
    ]

    for query in queries:
        tx.run(query)


def create_users(tx):
    tx.run(
        """
        UNWIND $users AS user
        MERGE (u:User {id: user.id})
        SET u.name = user.name,
            u.email = user.email
        """,
        users=users
    )


def create_categories(tx):
    tx.run(
        """
        UNWIND $categories AS category
        MERGE (:Category {name: category})
        """,
        categories=categories
    )


def create_brands(tx):
    tx.run(
        """
        UNWIND $brands AS brand
        MERGE (:Brand {name: brand})
        """,
        brands=brands
    )


def create_products(tx):
    tx.run(
        """
        UNWIND $products AS product

        MERGE (p:Product {id: product.id})

        SET p.name = product.name,
            p.price = product.price,
            p.rating = product.rating

        WITH p, product

        MATCH (b:Brand {name: product.brand})
        MERGE (p)-[:MADE_BY]->(b)

        WITH p, product

        MATCH (c:Category {name: product.category})
        MERGE (p)-[:BELONGS_TO]->(c)

        WITH p, product

        UNWIND product.features AS feature

        MERGE (f:Feature {name: feature})
        MERGE (p)-[:HAS_FEATURE]->(f)
        """,
        products=products
    )

def create_user_activity(tx):

    purchases = {
        1: [1, 11, 16],
        2: [2, 21, 26],
        3: [5, 6, 31],
        4: [8, 33, 37],
        5: [3, 17, 23],
        6: [4, 20, 27],
        7: [7, 12, 36],
        8: [1, 18, 49],
        9: [9, 34, 39],
        10: [10, 29, 48],
        11: [5, 13, 42],
        12: [2, 22, 44],
        13: [6, 32, 38],
        14: [4, 19, 45],
        15: [8, 14, 40],
        16: [3, 24, 41],
        17: [7, 15, 43],
        18: [10, 25, 46],
        19: [1, 30, 47],
        20: [5, 28, 50],
    }

    # =========================================================
    # PURCHASED RELATIONSHIPS
    # =========================================================

    for user_id, product_ids in purchases.items():

        for product_id in product_ids:

            tx.run(
                """
                MATCH (u:User {id: $user_id})
                MATCH (p:Product {id: $product_id})
                MERGE (u)-[:PURCHASED]->(p)
                """,
                user_id=user_id,
                product_id=product_id
            ).consume()

    # =========================================================
    # VIEWED RELATIONSHIPS
    # =========================================================

    for user_id in range(1, 21):

        product_id = ((user_id * 3) % 50) + 1

        tx.run(
            """
            MATCH (u:User {id: $user_id})
            MATCH (p:Product {id: $product_id})
            MERGE (u)-[:VIEWED]->(p)
            """,
            user_id=user_id,
            product_id=product_id
        ).consume()

    # =========================================================
    # LIKED RELATIONSHIPS
    # =========================================================

    for user_id in range(1, 21):

        product_id = ((user_id * 7) % 50) + 1

        tx.run(
            """
            MATCH (u:User {id: $user_id})
            MATCH (p:Product {id: $product_id})
            MERGE (u)-[:LIKED]->(p)
            """,
            user_id=user_id,
            product_id=product_id
        ).consume()


# =============================================================
# PRODUCT RELATIONSHIPS
# =============================================================

def create_product_relationships(tx):

    # ---------------------------------------------------------
    # SIMILAR PRODUCTS
    # ---------------------------------------------------------

    tx.run(
        """
        MATCH (p1:Product)-[:BELONGS_TO]->(c:Category)
        MATCH (p2:Product)-[:BELONGS_TO]->(c)
        WHERE p1.id < p2.id
        MERGE (p1)-[:SIMILAR_TO]->(p2)
        """
    ).consume()

    # ---------------------------------------------------------
    # COMPLEMENTARY PRODUCTS
    # ---------------------------------------------------------

    pairs = [
        (1, 16),
        (1, 21),
        (1, 26),
        (1, 41),
        (1, 44),
        (2, 16),
        (2, 23),
        (2, 27),
        (3, 17),
        (3, 23),
        (4, 16),
        (4, 21),
        (5, 23),
        (5, 26),
        (6, 36),
        (6, 38),
        (7, 36),
        (8, 37),
        (8, 39),
        (10, 37),
        (11, 16),
        (11, 21),
        (12, 16),
        (13, 17),
        (18, 48),
        (21, 23),
        (21, 26),
        (46, 47),
        (47, 48),
        (49, 50),
    ]

    for source_id, target_id in pairs:

        tx.run(
            """
            MATCH (p1:Product {id: $source_id})
            MATCH (p2:Product {id: $target_id})
            MERGE (p1)-[:COMPLEMENTARY_TO]->(p2)
            """,
            source_id=source_id,
            target_id=target_id
        ).consume()


# =============================================================
# PRINT DATABASE COUNTS
# =============================================================

def print_counts(tx):

    result = tx.run(
        """
        MATCH (n)
        RETURN labels(n) AS labels, count(n) AS count
        ORDER BY labels
        """
    )

    print("\nNODE COUNTS")

    for record in result:
        print(
            record["labels"],
            ":",
            record["count"]
        )

    relationship_result = tx.run(
        """
        MATCH ()-[r]->()
        RETURN type(r) AS relationship, count(r) AS count
        ORDER BY relationship
        """
    )

    print("\nRELATIONSHIP COUNTS")

    for record in relationship_result:
        print(
            record["relationship"],
            ":",
            record["count"]
        )


# =============================================================
# MAIN
# =============================================================

def seed_database():

    print("Starting ShopGraph database seed...")

    with driver.session() as session:

        print("Clearing existing database...")
        session.execute_write(clear_database)

        print("Creating constraints...")
        session.execute_write(create_constraints)

        print("Creating users...")
        session.execute_write(create_users)

        print("Creating categories...")
        session.execute_write(create_categories)

        print("Creating brands...")
        session.execute_write(create_brands)

        print("Creating products...")
        session.execute_write(create_products)

        print("Creating user activity...")
        session.execute_write(create_user_activity)

        print("Creating product relationships...")
        session.execute_write(create_product_relationships)

        print_counts(session)

    print("\nShopGraph database seeded successfully!")


# =============================================================
# RUN
# =============================================================

if __name__ == "__main__":

    try:
        seed_database()

    except Exception as error:

        print("\nSeed failed:")
        print(error)

        raise

    finally:

        driver.close()