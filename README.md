# Todo List Web Application

Ứng dụng Todo List được xây dựng với Node.js + Express + PostgreSQL cho backend và React cho frontend.

## Cấu trúc dự án

```
To-do-list-Web/
├── backend/                 # Backend API (Node.js + Express)
│   ├── config/             # Cấu hình database
│   ├── controllers/        # Controllers xử lý logic
│   ├── middleware/         # Middleware (auth, validation)
│   ├── models/            # Database models (Sequelize)
│   ├── routes/            # API routes
│   ├── app.js             # Entry point
│   └── package.json       # Dependencies
├── frontend/              # Frontend (React)
│   ├── public/
│   ├── src/
│   └── package.json
├── docker-compose.yml     # Docker configuration
└── README.md
```

## Cài đặt và chạy với Docker

### 1. Clone repository
```bash
git clone <repository-url>
cd To-do-list-Web
```

### 2. Tạo file .env cho backend
```bash
cd backend
cp .env.example .env
```

Chỉnh sửa file `.env` với các thông tin phù hợp:
```env
PORT=5000
NODE_ENV=development
DB_HOST=db
DB_PORT=5432
DB_NAME=todo_db
DB_USER=postgres
DB_PASSWORD=password
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
```

### 3. Chạy với Docker Compose
```bash
# Build và chạy tất cả services
docker-compose up --build

# Chạy ở background
docker-compose up -d --build

# Xem logs
docker-compose logs -f

# Dừng services
docker-compose down
```

### 4. Truy cập ứng dụng
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Database: localhost:5432

## Chạy local development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

### Database
Đảm bảo PostgreSQL đang chạy với thông tin trong file `.env`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `GET /api/auth/profile` - Lấy thông tin profile
- `PUT /api/auth/profile` - Cập nhật profile
- `PUT /api/auth/change-password` - Đổi mật khẩu

### Tasks
- `GET /api/tasks` - Lấy danh sách tasks
- `GET /api/tasks/:id` - Lấy chi tiết task
- `POST /api/tasks` - Tạo task mới
- `PUT /api/tasks/:id` - Cập nhật task
- `DELETE /api/tasks/:id` - Xóa task
- `PUT /api/tasks/bulk-update` - Cập nhật nhiều tasks

## Công nghệ sử dụng

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- bcryptjs (password hashing)
- express-validator (validation)

### Frontend
- React
- Vite (hoặc CRA)
- Axios (API calls)
- React Router (routing)

### DevOps
- Docker
- Docker Compose
- PostgreSQL (database)

## Tính năng

- ✅ Authentication (JWT)
- ✅ CRUD Tasks
- ✅ Task filtering & search
- ✅ Task priorities
- ✅ Task status management
- ✅ Bulk operations
- ✅ User profiles
- ✅ Database relationships
- ✅ API validation
- ✅ Error handling
- ✅ Docker containerization

## Troubleshooting

### Database connection issues
```bash
# Kiểm tra database container
docker-compose ps

# Xem logs database
docker-compose logs db

# Restart database
docker-compose restart db
```

### Backend issues
```bash
# Xem logs backend
docker-compose logs backend

# Restart backend
docker-compose restart backend
```

### Frontend issues
```bash
# Xem logs frontend
docker-compose logs frontend

# Restart frontend
docker-compose restart frontend
``` 