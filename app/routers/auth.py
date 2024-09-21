from fastapi import APIRouter, HTTPException
from app.services.firebase_service import auth
from pydantic import BaseModel
import logging

router = APIRouter()

class AuthRequest(BaseModel):
    email: str
    password: str

logging.basicConfig(level=logging.INFO)

@router.post("/signup")
async def signup(auth_request: AuthRequest):
    try:
        user = auth.create_user(
            email=auth_request.email,
            password=auth_request.password
        )
        return {"uid": user.uid}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/login")
async def login(auth_request: AuthRequest):
    raise HTTPException(status_code=400, detail="Login should be handled by the client using Firebase SDK.")
