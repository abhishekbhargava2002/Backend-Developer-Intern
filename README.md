# 📘 Finance Management System

## 🚀 Project Overview

This is a **Finance Management Backend API** built using:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

It provides a complete system for:

* 🔐 Admin Authentication
* 👥 User Management (Viewer, Analyst)
* 💰 Financial Record Management (Income/Expense)
* 🛡️ Role-Based Authorization
* 📊 Dashboard Analytics

---

## 📂 Project Structure

```
project/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── admin.controller.js
│   ├── userAuth.controller.js
│   ├── userManagement.controller.js
│   ├── userRecord.controller.js
│   └── dashBoard.controller.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── admin.model.js
│   ├── user.model.js
│   └── financial.model.js
│
├── routes/
│   ├── admin.routes.js
│   ├── user.routes.js
│   ├── userManagement.routes.js
│   ├── userRecord.routes.js
│   └── dashboard.routes.js
│
├── app.js
└── .env
```

---

## ⚙️ Installation

```bash
git clone https://github.com/your-username/finance-management-api.git
cd finance-management-api
npm install
```

---

## ▶️ Run the Project

```bash
npm run dev
```

---

## 🌐 Base URL

```
http://localhost:5000/api
```

---

## 🔐 Authentication & Authorization

### JWT Flow

1. User/Admin logs in
2. Server generates JWT token
3. Client sends token in headers:

```
Authorization: Bearer <token>
```

4. Middleware verifies token & role

---

### Middleware

* `authenticate` → Verifies JWT
* `authorize("Admin")` → Role-based access control

---

## 👤 Models

### Admin Model

```
name, email, password, isActive
```

* Admin has full system control

---

### User Model

```
name, email, password, role, status
```

Roles:

* Viewer → Read-only
* Analyst → View financial data

Status:

* Active / Inactive

---

### Financial Model

```
adminId, amount, type, category, date, notes, isDeleted
```

Enums:

* type → Income / Expense
* category → Food, Shopping, Transport, Entertainment

---

## 🎯 Controllers

### Admin Controller

* Register Admin
* Login Admin
* Password hashing using bcrypt
* JWT token generation

---

### User Auth Controller

* User Login
* Password comparison
* Token generation

---

### User Management Controller

* Create User (Admin only)
* Get Users (Pagination + Filter)
* Update User
* Toggle User Status

---

### Financial Controller

* Create Financial Record
* Get Financial Records (Pagination + Filters)
* Update Financial Record
* Delete Financial Record

---

### Dashboard Controller

* Total Income & Expense
* Net Balance
* Category-wise Summary

---

## 🔗 API Endpoints

### 🧑‍💼 Admin

```
POST /api/admin/register
POST /api/admin/login
```

---

### 🔑 User Authentication

```
POST /api/auth/login
```

---

### 👥 User Management (Admin Only)

```
POST   /api/users
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
PATCH  /api/users/:id/status
```

---

### 💰 Financial Records

```
POST   /api/financial
GET    /api/financial
GET    /api/financial/:id
PATCH  /api/financial/:id
DELETE /api/financial/:id
```

---

### 📊 Dashboard

```
GET /api/dashboard/summary
GET /api/dashboard/category-type
```

---

## 📄 Sample Request

### Create Financial Record

```json
{
  "amount": 1000,
  "type": "Expense",
  "category": "Food",
  "notes": "Dinner"
}
```

---

## 📦 Pagination Format

```json
{
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```
