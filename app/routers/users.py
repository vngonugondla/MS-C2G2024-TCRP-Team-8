from fastapi import APIRouter, Depends, HTTPException
from app.dependencies import get_current_user
from app.models.user import User
from app.services.firestore_service import FirestoreService
from app.models.patch import ProfilePatch
import logging
from datetime import datetime

router = APIRouter()
firestore_service = FirestoreService()

@router.post("/profile", response_model=User)
async def create_profile(user: User, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Creating profile for uid: {uid}")
        user.user_id = uid
        user.created_at = datetime.utcnow()
        firestore_service.create_user_profile(uid, user.dict())
        return user
    except Exception as e:
        logging.error(f"Error in create_profile: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/profile", response_model=User)
async def read_profile(uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Fetching profile for uid: {uid}")
        user_data = firestore_service.get_user_profile(uid)
        if user_data:
            return User(**user_data)
        else:
            raise HTTPException(status_code=404, detail="User profile not found.")
    except Exception as e:
        logging.error(f"Error in read_profile: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.put("/profile", response_model=User)
async def update_profile(user: User, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Updating profile for uid: {uid}")
        user.user_id = uid
        firestore_service.update_user_profile(uid, user.dict())
        return user
    except Exception as e:
        logging.error(f"Error in update_profile: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.delete("/profile", response_model=dict)
async def delete_profile(uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Deleting profile for uid: {uid}")
        delete_user_profile(uid)
        return {"message": "Profile deleted successfully"}
    except Exception as e:
        logging.error(f"Error in delete_profile: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.patch("/profile")
async def edit_profile(profile_patch: ProfilePatch, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Updating profile for UID: {uid}")
        firestore_service.update_user_profile(uid, profile_patch.dict(exclude_unset=True))
    except Exception as e:
        logging.error(f"Error updating profile for UID: {uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.patch("/interests/add")
async def add_interest(interest: str, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Adding interest for UID: {uid}")
        firestore_service.add_interest(uid, interest)
    except Exception as e:
        logging.error(f"Error adding interest for UID: {uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.patch("/interests/remove", response_model=User)
async def remove_interest(interest: str, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Removing interest for UID: {uid}")
        firestore_service.remove_interest(uid, interest)
    except Exception as e:
        logging.error(f"Error removing interest for UID: {uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.patch("/bio")
async def add_bio(bio: str, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Adding bio for UID: {uid}")
        firestore_service.add_bio(uid, bio)
    except Exception as e:
        logging.error(f"Error adding bio for UID: {uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.delete("/bio")
async def remove_bio(uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Removing bio for UID: {uid}")
        firestore_service.remove_bio(uid)
    except Exception as e:
        logging.error(f"Error removing bio for UID: {uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.patch("/profile/picture")
async def add_profile_picture(picture_url: str, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Adding profile picture for UID: {uid}")
        firestore_service.add_profile_picture(uid, picture_url)
    except Exception as e:
        logging.error(f"Error adding profile picture for UID: {uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.delete("/profile/picture")
async def remove_profile_picture(uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Removing profile picture for UID: {uid}")
        firestore_service.remove_profile_picture(uid)
    except Exception as e:
        logging.error(f"Error removing profile picture for UID: {uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


