# 📘 Finance Management System

## 🚀 Project Overview

This project is a **Finance Management Backend API** built using:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

It supports:

* Admin authentication
* User management (Viewer, Analyst)
* Financial record management (Income/Expense)
* Role-based authorization

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
│   └── userRecord.controller.js
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
│   └── userRecord.routes.js
│
├── app.js
└── .env
```

---

## 🔐 Authentication & Authorization

### JWT Flow

1. User/Admin logs in
2. Server generates token
3. Token sent in headers:

```
Authorization: Bearer <token>
```

4. Middleware verifies token

### Middleware

* `authenticate` → verifies JWT
* `authorize("Admin")` → role-based access

---

## 👤 Models Explanation

### 1. Admin Model

```js
name, email, password, isActive
```

* Only Admin can:

  * Create users
  * Manage financial records

---

### 2. User Model

```js
name, email, password, role, status
```

Roles:

* `Viewer` → Read-only access
* `Analyst` → Can view financial data

Status:

* Active / Inactive

---

### 3. Financial Model

```js
adminId, amount, type, category, date, notes, isDeleted
```

Enums:

* type → Income / Expense
* category → Food, Shopping, Transport, Entertainment

---

## 🎯 Controllers (Core Logic)

### 1. Admin Controller

Handles:

* Register Admin
* Login Admin

Important Concepts:

* Password hashing using bcrypt
* Token generation

---

### 2. User Auth Controller

Handles:

* User Login

Flow:

* Check email
* Compare password
* Generate token

---

### 3. User Management Controller

#### createUser

* Admin creates Viewer/Analyst
* Validates email
* Hashes password

#### getUsers

* Pagination
* Filter by status
* Only fetch Viewer role

#### updateUser

* Update name/email/password
* Email uniqueness check

#### toggleStatus

* Deactivate user

---

### 4. Financial Controller

#### createFinancial

* Only Admin can create
* Linked with adminId

#### getFinancials

* Pagination
* Filters:

  * type
  * category

#### updateFinancial

* Only owner Admin can update

#### deleteFinancial

* Deletes record (currently hard delete)

---

## 🧠 How to Handle Models & Controllers

### 1. Keep Controllers Clean

Controllers should:

* Validate request
* Call model
* Send response

❌ Bad:

```js
// Too much logic inside controller
```

✅ Good:

```js
// Minimal logic + readable
```

---

### 2. Use Mongoose Models Properly

#### Create

```js
await Model.create(data)
```

#### Read

```js
await Model.find(filter)
```

#### Update

```js
await Model.findByIdAndUpdate(id, data, { new: true })
```

#### Delete

```js
await Model.findByIdAndDelete(id)
```

---

### 3. Always Validate Input

* Required fields
* Email format
* Password length
* ObjectId validation

---

### 4. Use Enums for Data Integrity

Example:

```js
enum: ["Income", "Expense"]
```

Prevents invalid data entry.

---

### 5. Pagination 

```js
const skip = (page - 1) * limit;
```

Response:

```json
pagination: {
  total,
  page,
  limit,
  totalPages
}
```

---

### 6. Error Handling

Always use:

```js
try {
} catch (error) {
  res.status(500).json({
    success: false,
    message: error.message
  });
}
```

---

### 7. Security 

* Hash passwords (bcrypt)
* Never return password in API
* Use JWT
* Role-based access

---

## 🔗 API Endpoints

### Admin

```
POST /api/admins/register
POST /api/admins/login
```

### User Auth

```
POST /api/auth/login
```

### User Management (Admin only)

```
POST   /api/users
GET    /api/users
GET    /api/users/:id
PATCH  /api/users/:id
PATCH  /api/users/:id/status
```

### Financial Records

```
POST   /api/records
GET    /api/records
GET    /api/records/:id
PATCH  /api/records/:id
DELETE /api/records/:id
```

---

## ⚙️ Environment Variables

```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
```

---

## ▶️ Run Project

```bash
npm install
npm run dev
```
