from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime

class User(BaseModel):
    user_id: str
    #fcm_token : str
    name: str
    email: EmailStr
    phone: Optional[str]
    birthday: Optional[str]
    gender: Optional[str]
    bio: Optional[str]
    interests: Optional[List[str]] = []
    community_role: str = "member"
    profile_picture: Optional[str]
    location: Optional[str]
    approved: bool = False
    active: bool = True
    created_at: datetime
    points: int = 0
