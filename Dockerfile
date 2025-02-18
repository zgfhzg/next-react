#FROM node:11.0.16-alpine
FROM node:lts-alpine

# 디렉토리 지정
RUN mkdir -p /usr/src
WORKDIR /usr/src

# 필요한 모든 파일을 복사
COPY ./ ./

# next.js 앱 빌드
RUN npm install
RUN npm run build

# 포트 지정
EXPOSE 3000

# 서비스 기동
CMD ["npm", "run", "dev"]
