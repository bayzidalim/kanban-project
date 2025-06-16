Sure! Here’s a **Markdown file** template that includes **project setup instructions**, **API documentation**, and **additional notes for reviewers**.

---

# **Kanban Board - MERN Stack Project**

## **Project Setup Instructions**

### 1. **Clone the Repository**

First, clone the repository to your local machine.

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. **Install Dependencies**

Install both **frontend** and **backend** dependencies:

#### **Frontend (Next.js)**

Navigate to the **`kanban-frontend`** directory:

```bash
cd kanban-frontend
npm install
```

#### **Backend (Express.js)**

Navigate to the **`kanban-backend`** directory:

```bash
cd kanban-backend
npm install
```

### 3. **Run the Application**

To run the project locally:

#### **Frontend**

Start the **Next.js** frontend:

```bash
cd kanban-frontend
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

#### **Backend**

Start the **Express.js** backend:

```bash
cd kanban-backend
node server.js
```

The backend will be available at [http://localhost:5000](http://localhost:5000).

### 4. **MongoDB Setup**

Ensure you have **MongoDB** running locally or use a cloud instance like **MongoDB Atlas**.

If running locally, start MongoDB with:

```bash
mongod
```

---

## **API Documentation**

### **API Base URL**

The backend API is accessible at:
`http://localhost:5000/api`

### **1. Authentication API**

#### **POST /auth/register**

* **Description**: Register a new user with email and password.
* **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "Password@123"
  }
  ```
* **Response**:

  * **Success**:

  ```json
  {
    "message": "User created successfully"
  }
  ```

  * **Failure**:

  ```json
  {
    "error": "Email already in use"
  }
  ```

#### **POST /auth/login**

* **Description**: Login the user with email and password, returns a JWT token.
* **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "Password@123"
  }
  ```
* **Response**:

  * **Success**:

  ```json
  {
    "token": "JWT-TOKEN-HERE"
  }
  ```

  * **Failure**:

  ```json
  {
    "error": "Invalid credentials"
  }
  ```

### **2. Task API**

#### **GET /tasks**

* **Description**: Get all tasks for the authenticated user.
* **Headers**:

  * `Authorization: Bearer <JWT-TOKEN>`
* **Response**:

  ```json
  [
    {
      "_id": "task-id-1",
      "title": "Task 1",
      "status": "todo",
      "dueDate": "2025-06-16T00:00:00.000Z"
    },
    {
      "_id": "task-id-2",
      "title": "Task 2",
      "status": "in-progress",
      "dueDate": "2025-06-18T00:00:00.000Z"
    }
  ]
  ```

#### **POST /tasks**

* **Description**: Create a new task.
* **Request Body**:

  ```json
  {
    "title": "New Task",
    "status": "todo",
    "dueDate": "2025-06-16"
  }
  ```
* **Response**:

  * **Success**:

  ```json
  {
    "task": {
      "_id": "new-task-id",
      "title": "New Task",
      "status": "todo",
      "dueDate": "2025-06-16T00:00:00.000Z"
    }
  }
  ```

#### **PUT /tasks/\:id**

* **Description**: Update a task (e.g., change status).
* **Parameters**: `id` (task ID)
* **Request Body**:

  ```json
  {
    "status": "completed"
  }
  ```
* **Response**:

  * **Success**:

  ```json
  {
    "task": {
      "_id": "task-id-1",
      "title": "Updated Task",
      "status": "completed",
      "dueDate": "2025-06-16T00:00:00.000Z"
    }
  }
  ```

#### **DELETE /tasks/\:id**

* **Description**: Delete a task by ID.
* **Parameters**: `id` (task ID)
* **Response**:

  * **Success**:

  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

---

## **Additional Notes for Reviewers**

1. **Authentication**: The app uses **JWT** tokens for user authentication. Make sure to **store the token** securely in the frontend (e.g., in `localStorage`) and send it as an **Authorization header** in API requests.

2. **Task Status**: Tasks can be in one of three states: **"todo"**, **"in-progress"**, and **"completed"**. The app supports drag-and-drop functionality to update the task status.

3. **Backend Notes**:

   * The backend uses **Express.js** with **MongoDB** for storing user data and tasks.
   * Passwords are hashed using **bcrypt** for security.
   * The app handles **user registration**, **login**, and **CRUD operations for tasks**.

4. **Frontend Notes**:

   * The frontend is built with **Next.js 14** and **Tailwind CSS**.
   * The app supports **drag-and-drop** to update the status of tasks between columns (To Do, In Progress, Completed).
   * Users can **edit**, **delete**, and **add new tasks**.

---

### End of Documentation

This **Markdown file** provides all the setup instructions, API documentation, and notes for reviewers. Let me know if you'd like me to add any more details or if you need further adjustments!
