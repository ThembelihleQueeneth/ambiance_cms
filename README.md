# 🍽️ Ambiance CMS (Admin Panel)

Ambiance CMS is a **full-stack restaurant content management system** designed to help administrators manage menu items and customer orders efficiently. The system provides a clean admin dashboard, full CRUD functionality for menu items, and is built using modern web technologies.

---

## Features

### Admin Dashboard

* Central admin landing page
* Quick navigation to Menu Management and Orders
* Secure logout with confirmation modal

### Menu Management

* View all menu items in a modern card layout
* Add new menu items
* Edit existing menu items
* Delete menu items
* Image support via image URLs

### Orders (Planned / In Progress)

* View customer orders
* Track order status
* Future support for order metrics and analytics

---

##  Screenshots

### Admin Dashboard

<img width="1920" height="1080" alt="Dashboard" src="https://github.com/user-attachments/assets/6f749603-bb05-4dd9-9efa-4282cfc01256" />


### Menu Management
<img width="1920" height="1080" alt="ManageMenu" src="https://github.com/user-attachments/assets/02a6bc59-bcab-43ad-8547-9a3425c4d9fd" />

### Login

![Uploading Login.png…]()

---


##  Tech Stack

### Frontend

* **React** (with TypeScript)
* **React Router DOM** – navigation
* **Tailwind CSS** – styling
* **Axios** – API requests

### Backend

* **Node.js**
* **Express.js**
* **TypeScript**

### Database

* **PostgreSQL**

---

## Project Structure

```
ambiance-cms/               
│── components/                 # React frontend
│── pages/
│── services/
│── App.tsx
│
├── ambiance-api/                # Node.js backend
│   ├── routes/
│   ├── controllers/
│   ├── db/
│   └── index.ts
│
└── README.md
```

---

##  Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/your-username/ambiance-cms.git](https://github.com/ThembelihleQueeneth/ambiance_cms.git)
cd ambiance-cms
```

---

### 2️⃣ Backend Setup (Node + PostgreSQL)

```bash
cd ambiance-api
npm install
```

Create a `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=123456
DB_NAME=ambiance_db
```

Run the server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup (React)

```bash
cd ambiance_cms
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔗 API Endpoints

### Menu Items

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | /items     | Fetch all items |
| POST   | /items     | Add new item    |
| PUT    | /items/:id | Update item     |
| DELETE | /items/:id | Delete item     |


---

##  Author

**Thembelihle Maluka**
Junior Software Developer


