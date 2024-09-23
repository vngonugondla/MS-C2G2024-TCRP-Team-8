from fastapi import APIRouter, Depends, HTTPException, Body
from app.dependencies import get_current_user
from app.models.user import User
from app.models.patch import ProfilePatch

from app.services.firestore_service import FirestoreService
from typing import List
import logging
from datetime import datetime
from pydantic import BaseModel


router = APIRouter()
firestore_service = FirestoreService()


@router.patch("/points")
async def set_points(target_uid: str, points: int, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Setting points for UID: {target_uid} by staff UID: {uid}")
        
        updated_profile = firestore_service.set_points(target_uid, points)

        if updated_profile:
            return updated_profile
        else:
            raise HTTPException(status_code=500, detail="Error setting points")

    except Exception as e:
        logging.error(f"Error setting points for UID: {target_uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/points")
async def get_points(target_uid: str, uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Getting points for UID: {target_uid} by staff UID: {uid}")
        
        points = firestore_service.get_points(target_uid)

        if points:
            return {"points": points}
        else:
            raise HTTPException(status_code=500, detail="Error getting points")

    except Exception as e:
        logging.error(f"Error getting points for UID: {target_uid}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/points/all", response_model=List[User])
async def get_all_points(uid: str = Depends(get_current_user)):
    try:
        logging.info(f"Getting points for all users by staff UID: {uid}")
        
        all_points = firestore_service.get_all_points()

        if all_points:
            return all_points
        else:
            raise HTTPException(status_code=500, detail="Error getting points for all users")

    except Exception as e:
        logging.error(f"Error getting points for all users: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

