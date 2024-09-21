from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_current_user
from app.services.firebase_service import db
from app.models.user import User
import logging
from datetime import datetime

router = APIRouter()

@router.post("/profile", response_model=User)
async def create_or_update_profile(
    user: User, uid: str = Depends(get_current_user)
):
    try:
        logging.info(f"Creating/updating profile for uid: {uid}")
        user.user_id = uid
        user.created_at = datetime.utcnow()
        doc_ref = db.collection('users').document(uid)
        doc_ref.set(user.dict())
        logging.info("Profile saved successfully.")
        return user
    except Exception as e:
        logging.error(f"Error in create_or_update_profile: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/profile/me", response_model=User)
async def get_my_profile(uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Fetching profile for uid: {uid}")
        doc_ref = db.collection('users').document(uid)
        doc = doc_ref.get()
        if doc.exists:
            user_data = doc.to_dict()
            logging.info(f"Profile data retrieved: {user_data}")
            return User(**user_data)
        else:
            logging.warning(f"User profile not found for uid: {uid}")
            raise HTTPException(status_code=404, detail="User profile not found.")
    except Exception as e:
        logging.error(f"Error in get_my_profile: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
