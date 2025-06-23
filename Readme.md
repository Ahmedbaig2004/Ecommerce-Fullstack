# 🛒 E-Commerce Fullstack Platform

A complete fullstack e-commerce web application built with **React**, **Express**, and **MongoDB**, featuring:
- A customer-facing **frontend store**
- A secure **backend API**
- An **admin dashboard** for managing products, users, and orders

---

## 📁 Project Structure (Monorepo)

ecommerce-platform/
├── frontend/ # React-based e-commerce site for users
├── backend/ # Node.js/Express REST API with MongoDB
├── admin/ # React admin dashboard for managing the store


---

## 🚀 Tech Stack

### 🌐 Frontend (`/frontend`)
- **React 18**
- **React Router v7**
- **Tailwind CSS**
- **Vite**
- **React Toastify** for notifications
- **GitHub Pages** deployment

### 🧠 Backend (`/backend`)
- **Node.js** with **Express**
- **MongoDB** (with Mongoose)
- **JWT** for authentication
- **bcrypt** for password hashing
- **Stripe** for payment processing
- **Cloudinary + Multer** for image uploads
- **dotenv**, **cors**, **cookie-parser**

### 🛠️ Admin Dashboard (`/admin`)
- **React 19**
- **React Router v7**
- **Tailwind CSS**
- **React Toastify**
- **Axios** for backend API calls

---

## 📦 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/ahmedbaig2004/ecommerce-platform.git
cd ecommerce-platform

🌐 Deployment
Frontend
Deployed via GitHub Pages at:
📍 https://ahmedbaig2004.github.io/Ecommerce-frontend/


📸 Features
✅ Frontend
Browse products

Add to cart & checkout

User authentication (login/register)

Order history

✅ Backend:
RESTful API for products, orders, users

Secure auth using JWT

Role-based access (admin/user)

Image upload to Cloudinary

Stripe payment integration

✅ Admin Dashboard:
View and manage all products

View orders & users

Add/edit/delete products

Secure login

