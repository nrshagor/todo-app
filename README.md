# Todo Application (NestJS + Next.js)

A full-stack Todo application built for Sofof Tech assessment.

## Tech Stack

- Backend: NestJS, TypeORM, MySQL
- Frontend: Next.js, TypeScript, Tailwind CSS
- Auth: JWT Middleware
- Database: MySQL (Docker)
- Testing: Jest

---

## Project Structure

/backend → NestJS API  
/frontend → Next.js UI  
docker-compose.yml → MySQL + backend

---

## Setup Instructions

### 1. Clone repository

```bash
git clone https://github.com/nrshagor/todo-app
cd todo-app
```

### 2. Backend setup

```bash
cd backend
npm install
npm run start:dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

http://localhost:3001

Backend runs on:

http://localhost:3000

### Docker Setup

```bash
docker-compose up -d
```

### Authentication

All APIs are protected using JWT middleware.

Use this header in requests:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2ODMyMzcyMywiZXhwIjoxNzY4OTI4NTIzfQ.yl4s5RBAu4OHZMmk9g60qMkBdm4EOdyO8GDWlYNcYlQ
```

#### API Endpoints

```bash
POST /todos
GET /todos
GET /todos/:id
PUT /todos/:id
DELETE /todos/:id
```

### Features

- Create Todo (default status: PENDING)

- Update status (IN_PROGRESS, DONE)

- Filter todos by status

- Delete todo

- Confirmation modal for actions

### Testing

```bash
npm run test
```

### Notes

- Repository pattern used

- Clean architecture followed

- Simple UI as per requirement

## Author

[Noore Rabbi Shagor](https://github.com/nrshagor)
