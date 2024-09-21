from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_current_user
from app.services.firebase_service import db
from app.models.user import User
from datetime import datetime

router = APIRouter()

@router.post("/profile", response_model=User)
async def create_profile(user: User, uid: str = Depends(get_current_user)):
    user.uid = uid
    user.created_at = datetime.now()
    user.updated_at = datetime.now()
    
    doc_ref = db.collection('users').document(uid)
    doc_ref.set(user.dict())
    return user

@router.get("/profile/me", response_model=User)
async def get_my_profile(uid: str = Depends(get_current_user)):
    doc_ref = db.collection('users').document(uid)
    doc = doc_ref.get()
    if doc.exists:
        return User(**doc.to_dict())
    else:
        raise HTTPException(status_code=404, detail="User profile not found.")
