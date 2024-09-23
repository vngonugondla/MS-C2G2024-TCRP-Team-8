from fastapi import Header, HTTPException, Depends
from app.services.firebase_service import FirebaseService

firebase_service = FirebaseService()

async def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    token = authorization.split(" ")[1]
    uid = firebase_service.verify_token(token)
    if not uid:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return uid

def get_db():
    if firebase_service.db is None:
        raise HTTPException(status_code=500, detail="Database not initialized.")
    return firebase_service.db