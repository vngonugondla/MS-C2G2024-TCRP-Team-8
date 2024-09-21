from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routers import auth, users
from app.services.firebase_service import initialize_firebase

app = FastAPI(title="Community Chat App")

initialize_firebase()

# Include routers
app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])

# Serve static files (for frontend)
app.mount("/", StaticFiles(directory="app/static", html=True), name="static")
