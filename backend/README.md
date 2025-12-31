# TaskFlow - Backend Documentation

A robust REST API built with Node.js, Express, and MongoDB featuring JWT authentication and CRUD operations.

## 🚀 Features

- ✅ JWT-based authentication (signup/login)
- ✅ Password hashing with bcryptjs
- ✅ Protected routes with middleware
- ✅ Complete CRUD operations for tasks
- ✅ User profile management
- ✅ Search and filter functionality
- ✅ Input validation and error handling
- ✅ MongoDB with Mongoose ODM

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── User.js              # User model with password hashing
│   └── Task.js              # Task model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── tasks.js             # Task CRUD routes
│   └── profile.js           # Profile routes
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── server.js                # Entry point
└── README.md
```

## 📚 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "Tester",
  "email": "tester@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65abc123...",
    "name": "Tester",
    "email": "tester@example.com",
    "bio": "",
    "avatar": "https://ui-avatars.com/api/?name=User&background=random"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "tester@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

---

### Task Routes (All Protected)

#### Get All Tasks
```http
GET /api/tasks
Authorization: Bearer <token>

Query Parameters (optional):
- search: Search in title/description
- status: pending | in-progress | completed
- priority: low | medium | high
- sort: newest | oldest | priority | dueDate
```

#### Get Single Task
```http
GET /api/tasks/:id
Authorization: Bearer <token>
```

#### Create Task
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the backend API",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2025-12-31",
  "tags": ["work", "urgent"]
}
```

#### Update Task
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

#### Get Task Statistics
```http
GET /api/tasks/stats/overview
Authorization: Bearer <token>
```

---

### Profile Routes (All Protected)

#### Get Profile
```http
GET /api/profile
Authorization: Bearer <token>
```

#### Update Profile
```http
PUT /api/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Developer",
  "bio": "Full-stack developer",
  "avatar": "https://example.com/avatar.jpg"
}
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Middleware validates tokens on protected endpoints
- **Input Validation**: express-validator ensures data integrity
- **CORS Configuration**: Controlled cross-origin requests
- **Error Handling**: Comprehensive error messages and status codes

## 🧪 Testing with Postman

1. Import the API endpoints into Postman
2. Create an environment variable `baseUrl` = `http://localhost:5000`
3. Register a user via `/api/auth/signup`
4. Copy the returned token
5. Set `Authorization: Bearer <token>` for protected routes
6. Test all CRUD operations

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |
| MONGO_URI | MongoDB connection string | mongodb+srv://... |
| JWT_SECRET | Secret key for JWT | your_secret_key |
| JWT_EXPIRE | Token expiration | 7d |
| CLIENT_URL | Frontend URL for CORS | http://localhost:5173 |
