from pydantic import BaseModel

class UserActionCreate(BaseModel):
    user_id: int
    action: str