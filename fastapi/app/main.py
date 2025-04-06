from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.user_action import router as user_action_router
from app.db.models import UserAction
from app.db.session import Base, engine

app = FastAPI()

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 라우터 등록
app.include_router(user_action_router)

# ✅ 테이블 자동 생성
Base.metadata.create_all(bind=engine)