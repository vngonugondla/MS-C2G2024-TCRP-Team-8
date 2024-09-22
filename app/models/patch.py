from pydantic import BaseModel, Field
from typing import Optional, List

class ProfilePatch(BaseModel):
    target_uid: str = Field(..., description="User's UID")
    name: Optional[str] = Field(None, description="User's name")
    phone: Optional[str] = Field(None, description="User's phone number")
    birthday: Optional[str] = Field(None, description="User's birthday")
    gender: Optional[str] = Field(None, description="User's gender")
    bio: Optional[str] = Field(None, description="User's bio")
    interests: Optional[List[str]] = Field(None, description="User's interests")
    community_role: Optional[str] = Field(None, description="User's community role")
    profile_picture: Optional[str] = Field(None, description="User's profile picture URL")
    location: Optional[str] = Field(None, description="User's location")