# kanban-project-for-SoftBeez

### **README.md**

````markdown
# Kanban Project

A Kanban board application built with **React** (Next.js) for the frontend and **Node.js (Express)** with **MongoDB** for the backend.

## Project Setup Instructions

### 1. **Frontend Setup (Next.js)**

#### Clone the repository:

```bash
git clone https://github.com/bayzidalim/kanban-project.git
````

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
NEXT_PUBLIC_BACKEND_URL=https://kanban-project-1bc1.onrender.com
```

#### Run the frontend in development mode:

```bash
npm run dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

### 2. **Backend Setup (Node.js / Express)**

#### Clone the repository:

```bash
git clone https://github.com/bayzidalim/kanban-project.git
```

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
MONGO_URI=mongodb+srv://bayzidalim:f3GwaeeWxFlSOhz5@softbeezkanbancluster.bl3pjyi.mongodb.net/
JWT_SECRET=super_secret_key
PORT=5000
NODE_ENV=development
```

* **MONGO\_URI**: MongoDB connection string (obtain from MongoDB Atlas or your MongoDB instance).
* **JWT\_SECRET**: Secret key for JWT authentication.
* **PORT**: The port where the backend will run locally (default is `5000`).
* **NODE\_ENV**: Set to `development` for local development.

#### Run the backend:

```bash
npm run start
```

The backend should now be running on [http://localhost:5000](http://localhost:5000).

---

## API Documentation (REST)

### Base URL:

* **Frontend URL**: [https://kanban-project.vercel.app](https://kanban-project.vercel.app)
* **Backend URL**: [https://kanban-project-1bc1.onrender.com](https://kanban-project-1bc1.onrender.com)

### Authentication

#### Register User (POST)

* **Endpoint**: `/api/auth/register`

* **Method**: `POST`

* **Body**: JSON object with `email` and `password` fields.

* **Example**:

  ```json
  {
    "email": "testuser@example.com",
    "password": "Password@123"
  }
  ```

* **Response**:

  * **200 OK**: Registration successful.
  * **400 Bad Request**: Invalid input (e.g., already registered email).

---

#### Login User (POST)

* **Endpoint**: `/api/auth/login`

* **Method**: `POST`

* **Body**: JSON object with `email` and `password` fields.

* **Example**:

  ```json
  {
    "email": "testuser@example.com",
    "password": "Password@123"
  }
  ```

* **Response**:

  * **200 OK**: Login successful, returns JWT token.
  * **401 Unauthorized**: Invalid credentials.

---

### Task Management

#### Fetch All Tasks (GET)

* **Endpoint**: `/api/tasks`
* **Method**: `GET`
* **Headers**: `Authorization: Bearer <token>`
* **Response**: A list of tasks grouped by status (e.g., todo, in-progress, completed).

---

#### Create Task (POST)

* **Endpoint**: `/api/tasks`

* **Method**: `POST`

* **Body**: JSON object with `title`, `priority` fields, and optional `status`.

* **Example**:

  ```json
  {
    "title": "New Task",
    "priority": "high",
    "status": "todo"
  }
  ```

* **Response**:

  * **201 Created**: Task created successfully.

---

#### Update Task (PUT)

* **Endpoint**: `/api/tasks/:id`

* **Method**: `PUT`

* **Body**: JSON object with updated `title` or `status` or `priority`.

* **Example**:

  ```json
  {
    "status": "completed"
  }
  ```

* **Response**:

  * **200 OK**: Task updated successfully.

---

#### Delete Task (DELETE)

* **Endpoint**: `/api/tasks/:id`
* **Method**: `DELETE`
* **Response**:

  * **200 OK**: Task deleted successfully.

---

### Additional Notes for Reviewers

1. **Authentication**:

   * The backend uses **JWT tokens** for user authentication. After login, the token is stored in **localStorage** on the frontend and sent as a bearer token in the `Authorization` header for all protected routes (e.g., task management).

2. **Frontend**:

   * The frontend is built using **Next.js** and uses **server-side rendering** for pages like the Dashboard, which includes a drag-and-drop Kanban board.
   * All interactions with the backend, such as fetching tasks, creating, editing, and deleting tasks, are done via API requests using **fetch**.

3. **Drag-and-Drop**:

   * The **react-beautiful-dnd** library is used for drag-and-drop functionality, allowing tasks to be moved between columns (e.g., **To Do**, **In Progress**, **Completed**).
   * When tasks are moved, the new status is sent to the backend to be updated.

4. **Deployment**:

   * **Frontend**: Deployed on **Vercel** (URL: [https://kanban-project-wine.vercel.app](https://kanban-project-wine.vercel.app/)).
   * **Backend**: Deployed on **Render** (URL: [https://kanban-project-1bc1.onrender.com](https://kanban-project-1bc1.onrender.com)).

5. **Environment Variables**:

   * Ensure **MONGO\_URI**, **JWT\_SECRET**, and other environment variables are correctly set up in your backend on Render.
   * For the frontend, use the **`NEXT_PUBLIC_BACKEND_URL`** environment variable to store the backend URL for API requests.

---

### **Contributing**

If you'd like to contribute to this project, feel free to fork the repository, create a new branch, and make your changes. Afterward, you can create a **pull request** for review.

---

