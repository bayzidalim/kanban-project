# Kanban Project

A Kanban board application built with **React** (Next.js) for the frontend and **Node.js (Express)** with **SQLite** for the backend (hosted on Fly.io).

## Project Setup Instructions

### 1. **Frontend Setup (Next.js)**

#### Clone the repository:

```bash
git clone https://github.com/bayzidalim/kanban-project.git
```

#### Navigate to the frontend directory:

```bash
cd kanban-frontend
```

#### Install dependencies:

```bash
npm install
```

#### Set up environment variables:

* Create a `.env.local` file in the root of the `kanban-frontend` folder.
* Add the following variable for the **backend URL** (this is the live backend URL):

```env
NEXT_PUBLIC_API_BASE_URL=https://kanban-backend-bayzidalim.fly.dev/api
```

#### Run the frontend in development mode:

```bash
npm run dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

### 2. **Backend Setup (Node.js / Express)**

#### Navigate to the backend directory:

```bash
cd kanban-backend
```

#### Install dependencies:

```bash
npm install
```

#### Set up environment variables:

* Create a `.env` file in the root of the `kanban-backend` folder.
* Add the following variables:

```env
JWT_SECRET=super_secret_key
PORT=5000
```

#### Run the backend:

```bash
npm run start
```

The backend should now be running on [http://localhost:5000](http://localhost:5000).

---

## API Documentation (REST)

### Base URL:

* **Frontend URL**: [https://kanban-project.vercel.app](https://kanban-project.vercel.app)
* **Backend URL**: [https://kanban-backend-bayzidalim.fly.dev/api](https://kanban-backend-bayzidalim.fly.dev/api)

### Authentication

#### Register User (POST)

* **Endpoint**: `/api/auth/register`
* **Method**: `POST`
* **Body**: JSON object with `email` and `password`.

#### Login User (POST)

* **Endpoint**: `/api/auth/login`
* **Method**: `POST`
* **Body**: JSON object with `email` and `password`.

---

### Task Management

#### Fetch All Tasks (GET)

* **Endpoint**: `/api/tasks`
* **Headers**: `Authorization: Bearer <token>`

#### Create Task (POST)

* **Endpoint**: `/api/tasks`
* **Body**: `title`, `priority`, `status` (optional)

#### Update Task (PUT)

* **Endpoint**: `/api/tasks/:id`

#### Delete Task (DELETE)

* **Endpoint**: `/api/tasks/:id`

---

## Deployment Update

* **Backend**: Hosted on **Fly.io** using Docker and SQLite volumes.
