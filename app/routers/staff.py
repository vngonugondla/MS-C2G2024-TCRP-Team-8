from fastapi import APIRouter, Depends, HTTPException, Body
from app.dependencies import get_current_user
from app.models.user import User
from app.models.patch import ProfilePatch
from app.models.toggle_active import ToggleActiveRequest
from app.models. toggle_approved import ToggleApprovedRequest
from app.services.firestore_service import FirestoreService
from typing import List
import logging
from datetime import datetime
from pydantic import BaseModel


router = APIRouter()
firestore_service = FirestoreService()

@router.get("/profile/{target_uid}", response_model=User)
async def read_profile(target_uid: str, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Fetching {target_uid} for staff uid: {uid}")

        user_profile = firestore_service.get_user_profile(uid)
        if not user_profile:
            raise HTTPException(status_code=404, detail="User profile not found.")
        if user_profile.get('community_role') != 'staff':
            raise HTTPException(status_code=403, detail="Access forbidden: Staff only.")
     
        user_data = firestore_service.get_user_profile(target_uid)
        if user_data:
            return User(**user_data)
        else:
            raise HTTPException(status_code=404, detail="User profile not found.")
    except Exception as e:
        logging.error(f"Error in view_profile: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.patch("/profile")
async def edit_profile(profile_patch: ProfilePatch, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Updating profile for UID: {profile_patch.target_uid} by staff UID: {uid}")
        user_profile = firestore_service.get_user_profile(uid)
        if not user_profile:
            raise HTTPException(status_code=404, detail="User profile not found.")
        if user_profile.get('community_role') != 'staff':
            raise HTTPException(status_code=403, detail="Access forbidden: Staff only.")

        firestore_service.update_user_profile(profile_patch.target_uid, profile_patch.dict(exclude_unset=True))
       
    except Exception as e:
        logging.error(f"Error updating profile for UID: {profile_patch.target_uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/profile/all/{query}", response_model=List[User])
async def get_all_users(query: str, uid: str = Depends(get_current_user)):

    try:
        logging.info(f"Fetching all users for staff uid: {uid}")

        user_profile = firestore_service.get_user_profile(uid)
        if not user_profile:
            raise HTTPException(status_code=404, detail="User profile not found.")
        if user_profile.get('community_role') != 'staff':
            raise HTTPException(status_code=403, detail="Access forbidden: Staff only.")
        
        users = firestore_service.get_all_users(query)
        if users:
            return users
        else:
            raise HTTPException(status_code=404, detail="No users found.")
    except Exception as e:
        logging.error(f"Error in get_all_users: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.patch("/active")
async def toggle_active(request: ToggleActiveRequest, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Toggling active status for UID: {request.target_uid} by staff UID: {uid}")

        user_profile = firestore_service.get_user_profile(uid)
        if not user_profile:
            raise HTTPException(status_code=404, detail="User profile not found.")
        if user_profile.get('community_role') != 'staff':
            raise HTTPException(status_code=403, detail="Access forbidden: Staff only.")
        
        toggled_profile = firestore_service.toggle_user_active_status(request.target_uid)

        if toggled_profile:
            return toggled_profile
        else:
            raise HTTPException(status_code=500, detail="Error toggling active status")

    except Exception as e:
        logging.error(f"Error toggling active status for UID: {request.target_uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.patch("/approved")
async def toggle_approved(request: ToggleApprovedRequest, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Toggling approved status for UID: {request.target_uid} by staff UID: {uid}")

        user_profile = firestore_service.get_user_profile(uid)
        if not user_profile:
            raise HTTPException(status_code=404, detail="User profile not found.")
        if user_profile.get('community_role') != 'staff':
            raise HTTPException(status_code=403, detail="Access forbidden: Staff only.")
        
        toggled_profile = firestore_service.toggle_user_approved_status(request.target_uid)

        if toggled_profile:
            return toggled_profile
        else:
            raise HTTPException(status_code=500, detail="Error toggling approved status")

    except Exception as e:
        logging.error(f"Error toggling approved status for UID: {request.target_uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.patch("/email")
async def change_email(request: ProfilePatch, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Changing email for UID: {request.target_uid} by staff UID: {uid}")

        user_profile = firestore_service.get_user_profile(uid)
        if not user_profile:
            raise HTTPException(status_code=404, detail="User profile not found.")
        if user_profile.get('community_role') != 'staff':
            raise HTTPException(status_code=403, detail="Access forbidden: Staff only.")
        
        firestore_service.change_email(request.target_uid, request.email)

    except Exception as e:
        logging.error(f"Error changing email for UID: {request.target_uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.patch("/phone")
async def change_phone(request: ProfilePatch, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Changing phone for UID: {request.target_uid} by staff UID: {uid}")

        user_profile = firestore_service.get_user_profile(uid)
        if not user_profile:
            raise HTTPException(status_code=404, detail="User profile not found.")
        if user_profile.get('community_role') != 'staff':
            raise HTTPException(status_code=403, detail="Access forbidden: Staff only.")

        firestore_service.change_phone(request.target_uid, request.phone)
    except Exception as e:
        logging.error(f"Error changing phone for UID: {request.target_uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")