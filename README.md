# XYZ Backend (Express + MongoDB)

Simple REST API used by the React frontend.

## Endpoints
- POST /api/auth/login { email, password } -> { token }
- GET /api/services
- POST /api/services (auth)
- PATCH /api/services/:id (auth)
- DELETE /api/services/:id (auth)
- GET /api/messages (auth)
- POST /api/messages
- PATCH /api/messages/:id/toggle (auth)
- DELETE /api/messages/:id (auth)

Auth uses a Bearer JWT signed with `JWT_SECRET`.

## Setup
1. Create `.env` in backend/
2. Install deps and run

### .env example

See `.env.example` or copy:

```
PORT=5000
CORS_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/xyz_innovations
JWT_SECRET=replace-with-a-strong-secret
ADMIN_EMAIL=admin@xyz.com
ADMIN_PASSWORD=admin123
```

### Install & Run

```bash
# in backend/
npm i
npm run dev
```

Server runs at http://localhost:5000
