# Backend Documentation

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

## 🛠️ Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster
4. Click "Connect" → "Connect your application"
5. Copy the connection string

### 4. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/scalable-web-app?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

**Replace:**
- `<username>` and `<password>` with your MongoDB credentials
- `your_super_secret_jwt_key_change_this` with a strong random string

### 5. Run the server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
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
    "name": "John Doe",
    "email": "john@example.com",
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
  "email": "john@example.com",
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
  "dueDate": "2024-12-31",
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
  "name": "John Updated",
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

## 📦 Scalability Considerations

### Current Architecture
- **Modular structure**: Separated concerns (models, routes, middleware)
- **Mongoose ODM**: Efficient database queries and validation
- **JWT stateless auth**: No server-side session storage

### For Production Scale
1. **Caching Layer**: Implement Redis for frequently accessed data
2. **Rate Limiting**: Add express-rate-limit to prevent abuse
3. **Logging**: Use Winston or Morgan for comprehensive logging
4. **Database Indexing**: Add indexes on frequently queried fields
5. **Load Balancing**: Use PM2 or Nginx for multiple server instances
6. **Microservices**: Split into separate services (auth, tasks, notifications)
7. **Message Queues**: Use RabbitMQ or Kafka for async operations
8. **CDN**: Serve static assets via CDN
9. **Database Replication**: Set up MongoDB replica sets
10. **Monitoring**: Implement APM tools (New Relic, Datadog)
    
## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |
| MONGO_URI | MongoDB connection string | mongodb+srv://... |
| JWT_SECRET | Secret key for JWT | your_secret_key |
| JWT_EXPIRE | Token expiration | 7d |
| CLIENT_URL | Frontend URL for CORS | http://localhost:5173 |

## 🐛 Common Issues

### MongoDB Connection Error
- Verify MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for development)
- Check username and password in connection string
- Ensure database user has proper permissions

### JWT Token Invalid
- Check if JWT_SECRET matches between environments
- Verify token is being sent in Authorization header
- Token may have expired (check JWT_EXPIRE setting)
