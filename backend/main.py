from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.product_routes import router as product_router
from routes.recommendation_routes import router as recommendation_router
from routes.graph_routes import router as graph_router
from routes.user_routes import router as user_router


# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="ShopGraph API"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
    "http://localhost:5173",
    "http://localhost:8080",
    "http://localhost:8081",
],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================================================
# ROUTERS
# =========================================================

app.include_router(product_router)

app.include_router(
    recommendation_router
)

app.include_router(
    graph_router
)

app.include_router(
    user_router
)


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():

    return {
        "message": "ShopGraph API is running"
    }


# =========================================================
# HEALTH
# =========================================================

@app.get("/api/health")
def health():

    return {
        "status": "ok",
        "service": "ShopGraph Backend"
    }