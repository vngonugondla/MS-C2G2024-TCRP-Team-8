from pydantic import BaseModel

class ToggleActiveRequest(BaseModel):
    target_uid: str