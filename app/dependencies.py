from fastapi import Header, HTTPException, Depends
from app.services.firebase_service import verify_token

async def get_current_user(authorization: str = Header(...)):
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    token = authorization.split(" ")[1]
    uid = verify_token(token)
    if not uid:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")
    return uid
