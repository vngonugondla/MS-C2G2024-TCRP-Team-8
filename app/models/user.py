from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class User(BaseModel):
    uid: str
    email: EmailStr
    name: str
    age: int
    profile_picture: Optional[str] = None
    bio: Optional[str] = None
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()
