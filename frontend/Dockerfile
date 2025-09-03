# Dockerfile cho React frontend
FROM node:18-alpine

WORKDIR /app

# Copy package.json và package-lock.json trước để cache npm install
COPY package*.json ./

RUN npm install

# Copy toàn bộ code
COPY . .

# Build app cho production (optional, nếu dev thì chỉ cần npm start)
# RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
