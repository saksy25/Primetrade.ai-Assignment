# TaskFlow - Frontend Documentation

Modern, responsive React application built with Vite and TailwindCSS.

## 🚀 Features

- ✅ **Authentication**: JWT-based login/signup with protected routes
- ✅ **Dashboard**: Overview with task statistics
- ✅ **Task Management**: Complete CRUD operations
- ✅ **Search & Filter**: Find tasks by title, status, and priority
- ✅ **Profile Management**: Update user information
- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **Modern UI**: TailwindCSS with beautiful components

## 🛠️ Tech Stack

- **Framework**: React with Vite
- **Styling**: TailwindCSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **State Management**: Context API

## 🎨 Features Overview

### Authentication
- **Login Page**: Email/password authentication
- **Signup Page**: User registration with validation
- **Protected Routes**: Automatic redirect if not authenticated
- **JWT Storage**: Token stored in localStorage
- **Auto-logout**: On token expiration

### Dashboard
- **Statistics Cards**: Total, pending, in-progress, completed tasks
- **Recent Tasks**: Quick view of latest 5 tasks
- **Responsive Layout**: Sidebar navigation with mobile menu

### Task Management
- **Create**: Modal form for new tasks
- **Read**: List view with search and filters
- **Update**: Edit existing tasks
- **Delete**: Remove tasks with confirmation
- **Search**: Real-time search in title/description
- **Filters**: By status and priority
- **Sort**: Multiple sort options

### Profile
- **View**: Display user information
- **Edit**: Update name, bio, avatar
- **Stats**: Account statistics

## 🎯 Component Architecture

### Context API
```javascript
AuthContext
├── user (state)
├── login (method)
├── signup (method)
├── logout (method)
└── updateUser (method)
```

### Routing
```
/
├── /login (public)
├── /signup (public)
└── /dashboard (protected)
    ├── / (dashboard home)
    ├── /tasks (task list)
    └── /profile (user profile)
```

## 🧪 Testing the Application

1. **Start Backend** (Port 5000)
```bash
cd backend
npm run dev
```

2. **Start Frontend** (Port 5173)
```bash
cd frontend
npm run dev
```

3. **Test Flow**:
   - Visit http://localhost:5173
   - Click "Sign up"
   - Create an account
   - Login with credentials
   - View dashboard
   - Create tasks
   - Update profile

## 📊 API Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | /api/auth/signup | Register user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get current user |
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |
| GET | /api/tasks/stats/overview | Get statistics |
| GET | /api/profile | Get profile |
| PUT | /api/profile | Update profile |
