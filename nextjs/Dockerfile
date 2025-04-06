FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 의존성 설치
COPY package*.json ./
RUN npm install

# 전체 코드 복사
COPY . .

# 포트 열기 및 개발 서버 실행
EXPOSE 3000
CMD ["npm", "run", "dev"]