import os
from dotenv import load_dotenv
from neo4j import GraphDatabase

load_dotenv()

URI = os.getenv("COGNODB_URI")
USERNAME = os.getenv("COGNODB_USERNAME")
PASSWORD = os.getenv("COGNODB_PASSWORD")

driver = GraphDatabase.driver(
    URI,
    auth=(USERNAME, PASSWORD)
)


def verify_connection():
    try:
        driver.verify_connectivity()
        print("Connected to CognoDB successfully!")
        return True
    except Exception as e:
        print("CognoDB connection failed:", e)
        return False