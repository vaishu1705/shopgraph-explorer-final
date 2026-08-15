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
```

---

## Graph Data Model

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
| `SIMILAR_TO` | Products are similar |
| `COMPLEMENTARY_TO` | Products complement each other |
| `MADE_BY` | Product belongs to a brand |
| `BELONGS_TO` | Product belongs to a category |
| `HAS_FEATURE` | Product has a feature |

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
 |
 +---- HAS_FEATURE ------> Feature
```

---

## Recommendation System

ShopGraph uses graph traversal to generate personalized recommendations.

```text
User
 |
 | PURCHASED
 v
Product
 |
 | SIMILAR_TO / COMPLEMENTARY_TO
 v
Recommended Product
```

Previously purchased products are excluded from recommendations.

Recommendations are ranked using graph connections and product ratings.

---

## Recommendation Explanation

ShopGraph explains why a product was recommended.

### Example

```text
User
 |
 | PURCHASED
 v
Laptop
 |
 | COMPLEMENTARY_TO
 v
Laptop Stand
```

This allows users to understand the relationship behind a recommendation.

---

## Backend APIs

### Products

```text
GET /api/products
GET /api/products/{product_id}
GET /api/products/{product_id}/similar
GET /api/products/{product_id}/complementary
GET /api/products/{product_id}/also-bought
```

### Recommendations

```text
GET /api/recommendations/{user_id}
GET /api/recommendations/{user_id}/reasons
```

### Graph

```text
GET /api/graph/{user_id}
```

### Users

```text
GET /api/users/{user_id}
GET /api/users/{user_id}/activity
GET /api/users/{user_id}/stats
```

### Health Check

```text
GET /api/health
```

---

## Application Pages

- Home
- Explore
- Product Details
- Cart
- Checkout
- My Orders
- Recommendations
- Graph Explorer
- Profile
- Activity

---

## Project Structure

```text
shopgraph-explorer/
│
├── backend/
│   ├── db/
│   ├── routes/
│   ├── seed/
│   ├── .env
│   ├── .env.example
│   ├── main.py
│   └── requirements.txt
│
├── public/
│
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── routes/
│   └── services/
│
├── .gitignore
├── package.json
├── README.md
└── vite.config.ts
```

---

## Running the Project

### Prerequisites

- Node.js
- npm
- Python 3
- Git
- CognoDB access

### Frontend

From the project root:

```bash
npm install
npm run dev
```

### Backend

Open another terminal:

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

---

## Environment Variables

Create a `backend/.env` file:

```env
COGNODB_URI=your_connection_string
COGNODB_USERNAME=your_username
COGNODB_PASSWORD=your_password
```

The `.env` file contains private credentials and must not be committed to GitHub.

---

## Security

- Database credentials are stored in environment variables.
- `.env` is excluded using `.gitignore`.
- `.env.example` contains no real credentials.
- Backend queries use parameterized Cypher.

---

## Database Connection

The backend uses the Neo4j Python Driver to connect to CognoDB.

The database connection is verified using:

```python
driver.verify_connectivity()
```

---

## API Health Check

After starting the backend, the health endpoint can be checked at:

```text
http://127.0.0.1:8000/api/health
```

Expected response:

```json
{
  "status": "ok",
  "service": "ShopGraph Backend"
}
```

---

## Current Status

| Component | Status |
|---|---|
| Frontend | ✅ Complete |
| FastAPI Backend | ✅ Working |
| CognoDB | ✅ Connected |
| Product APIs | ✅ Working |
| Recommendation APIs | ✅ Working |
| User APIs | ✅ Working |
| Graph API | ✅ Working |
| Graph Explorer | ✅ Working |
| Cart | ✅ Working |
| Checkout | ✅ Working |
| My Orders | ✅ Working |

---

## Future Enhancements

- User authentication
- Real payment integration
- Advanced recommendation algorithms
- Collaborative filtering
- Product embeddings
- Real-time analytics
- Cloud deployment

---

## GitHub Repository

[ShopGraph Explorer](https://github.com/vaishu1705/shopgraph-explorer-final)

---

## Conclusion

ShopGraph Explorer demonstrates how graph-based relationships can be used to build an explainable e-commerce recommendation platform.

The system connects users, products, brands, categories, and shopping activity to provide personalized and explainable product recommendations.