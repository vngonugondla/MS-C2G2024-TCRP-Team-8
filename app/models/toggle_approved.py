from pydantic import BaseModel

class ToggleApprovedRequest(BaseModel):
    target_uid: str