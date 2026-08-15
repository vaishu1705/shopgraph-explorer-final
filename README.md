# ShopGraph Explorer

ShopGraph Explorer is an explainable e-commerce recommendation platform that uses graph relationships to understand connections between users, products, brands, categories, and shopping activity.

Instead of simply showing recommended products, ShopGraph uses relationships such as `PURCHASED`, `VIEWED`, `LIKED`, `SIMILAR_TO`, and `COMPLEMENTARY_TO` to discover and explain relevant products.

---

## Features

- Product discovery and browsing
- Product search and filtering
- Product details
- Shopping cart
- Checkout
- My Orders
- Personalized recommendations
- "Why recommended?" explanations
- Interactive Graph Explorer
- User profile
- User activity
- Similar product recommendations
- Complementary product recommendations
- Customers-also-bought recommendations
- Graph-based recommendation scoring
- Responsive user interface
- Loading, error, and empty states
- FastAPI backend
- CognoDB graph database integration

---

## Technology Stack

### Frontend

- React
- TypeScript
- Vite
- TanStack Router
- TanStack Query
- Tailwind CSS
- Lucide React

### Backend

- Python
- FastAPI
- Uvicorn
- Neo4j Python Driver

### Database

- CognoDB
- Cypher
- Graph database model

---

## System Architecture

```text
User
  |
  v
React + TypeScript Frontend
  |
  | REST API
  v
FastAPI Backend
  |
  | Neo4j Python Driver
  v
CognoDB Graph Database

---

## Graph Data Model

ShopGraph represents the e-commerce system using graph nodes and relationships.

### Nodes

- User
- Product
- Brand
- Category
- Feature

### Relationships

| Relationship | Description |
|---|---|
| `PURCHASED` | User purchased a product |
| `VIEWED` | User viewed a product |
| `LIKED` | User liked a product |
| `SIMILAR_TO` | Connects similar products |
| `COMPLEMENTARY_TO` | Connects products that can be used together |
| `MADE_BY` | Connects a product to its brand |
| `BELONGS_TO` | Connects a product to its category |
| `HAS_FEATURE` | Connects a product to a feature |

### Example Graph

```text
User
 |
 | PURCHASED
 v
Product
 |
 +---- SIMILAR_TO -------> Product
 |
 +---- COMPLEMENTARY_TO -> Product
 |
 +---- MADE_BY ----------> Brand
 |
 +---- BELONGS_TO -------> Category