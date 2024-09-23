from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routers import users, staff, system
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Community Chat App")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(staff.router, prefix="/staff", tags=["staff"])
app.include_router(system.router, prefix="/system", tags=["system"])

# Serve static files (for frontend)
app.mount("/", StaticFiles(directory="app/static", html=True), name="static")

