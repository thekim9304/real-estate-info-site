# Web Devel Template

FastAPI + Next.js + PostgreSQL 기반의 웹 개발 템플릿입니다.  

Docker 기반으로 구성되어 있어 로컬 및 배포 환경 모두 빠르게 시작할 수 있습니다.

---

## 📦 기술 스택

- **Frontend**: Next.js (React 기반 SSR 프레임워크)
- **Backend**: FastAPI (Python 기반 비동기 API 서버)
- **Database**: PostgreSQL 14
- **DevOps**: Docker + Docker Compose

---

## 🐧 0단계: 깡통 리눅스에서 시작하기 (Ubuntu 기준)

### 0.1 Docker & Git 설치

```bash
sudo apt update
sudo apt install -y docker.io docker-compose git

# Docker 실행 및 권한 부여
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker $USER
```

> ❗ 권한 적용을 위해 **로그아웃 후 다시 로그인**해야 `docker` 명령어가 제대로 작동합니다.

---

### 0.2 템플릿 클론

```bash
git clone https://github.com/thekim9304/web-dev-template.git {project_dir_name}
cd {project_dir_name}
```

---

### 0.3 `.env` 파일 생성

```bash
cp .env.example .env
cp ./nextjs/.env.local.example ./nextjs/.env.local
```

#### 또는 직접 생성

.env
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=realestate
POSTGRES_PORT=5432
POSTGRES_HOST=postgres
```

.env.local
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

### 0.4 Docker로 전체 실행

```bash
docker-compose up --build
```

---

## ✅ 접속 확인

| 서비스 | 주소 |
|--------|------|
| 🟢 프론트엔드 (Next.js) | http://localhost:3000 |
| 🟢 백엔드 (FastAPI)    | http://localhost:8000/docs |
| 🐘 DB (PostgreSQL)     | localhost:5432 (컨테이너 내부 연결 전용) |

---

## 📁 프로젝트 구조

```
.
├── .env.example              # 환경 변수 예시
.
├── docker-compose.yml       # 전체 서비스 실행 정의
├── .env                     # 공통 환경 변수 설정
├── README.md
│
├── fastapi/                 # ✅ 백엔드 서버
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/
│       ├── main.py                  # ✅ FastAPI 진입점 (라우터 등록, 테이블 생성 등)
│       ├── api/
│       │   └── user_action.py       # ✅ 사용자 액션 저장 및 조회 API 라우터
│       └── db/
│           ├── models.py           # ✅ SQLAlchemy 모델 정의 (DB 테이블 구조)
│           ├── schemas.py          # ✅ Pydantic 스키마 (입출력 유효성 검사)
│           └── session.py          # ✅ DB 연결 및 세션 관리 + 재시도 로직 포함
│
├── nextjs/                  # ✅ 프론트엔드
│   ├── Dockerfile
│   ├── package.json
│   ├── .env.local           # ✅ API URL 설정 (NEXT_PUBLIC_API_URL=http://localhost:8000)
│   └── pages/
│       └── index.js         # ✅ 메인 페이지 - 버튼 클릭 시 API 요청 및 UI 구성
│
└── pgadmin/ (optional)      # pgAdmin4 접속용 (http://localhost:5050)
```