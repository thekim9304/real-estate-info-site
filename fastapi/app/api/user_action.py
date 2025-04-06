from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.models import UserAction
from app.db.schemas import UserActionCreate
from app.db.session import get_db
import random

router = APIRouter()

@router.post("/log-action")
def log_action(action: UserActionCreate, db: Session = Depends(get_db)):
    new_action = UserAction(**action.dict())
    db.add(new_action)
    db.commit()
    return {"message": "액션 저장됨!"}

@router.get("/random-number")
def random_number():
    return {"number": random.randint(1, 100)}

@router.get("/logs")
def get_logs(db: Session = Depends(get_db)):
    logs = db.query(UserAction).all()
    return [{"id": log.id, "user_id": log.user_id, "action": log.action} for log in logs]