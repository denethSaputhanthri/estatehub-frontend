# 🏠 EstateHub — Real Estate Management Platform

Modern real estate management platform frontend built with **React**. EstateHub provides role-based experiences for customers, sellers, agents, and administrators through a responsive and scalable web interface.

The frontend is designed to integrate with the **EstateHub Spring Boot backend** through RESTful APIs.

---

## ✨ Features

### 🔐 Authentication & Authorization

* User login and authentication
* Protected routes
* Role-based route protection
* Separate dashboards based on user roles
* Automatic redirection for unauthorized users
* Persistent authentication state

### 👤 User Roles

EstateHub supports multiple user roles:

* 🧑‍💼 **Customer**
* 🏠 **Seller**
* 🤝 **Agent**
* 🛡️ **Admin**

Each role has access to its own dedicated dashboard and functionality.

### 🏡 Property Management

* Browse available properties
* View properties by category
* Property-focused customer interface
* Property management foundation for sellers and agents
* Structured property-related pages

### 🎨 User Interface

* Responsive design
* Modern dashboard layouts
* Reusable React components
* Clean navigation
* Role-specific interfaces
* Mobile-friendly layouts

---

## 🛠️ Technologies

| Technology   | Purpose                  |
| ------------ | ------------------------ |
| React        | Frontend framework       |
| React Router | Client-side routing      |
| JavaScript   | Application logic        |
| Tailwind CSS | Styling                  |
| Axios        | REST API communication   |
| Vite         | Development & build tool |
| ESLint       | Code quality             |

---

## 🏗️ Architecture

The project follows a component-based React architecture with separate pages, routing, authentication, and reusable UI components.

```text
User
 │
 ▼
React Application
 │
 ├── Authentication
 │
 ├── Protected Routes
 │
 ├── Role Routes
 │
 ├── Pages
 │
 ├── Components
 │
 └── API Services
        │
        ▼
   EstateHub Backend
        │
        ▼
   Spring Boot REST API
        │
        ▼
     PostgreSQL
```

---

## 📂 Project Structure

```text
estatehub-frontend/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │
│   ├── pages/
│   │   ├── auth/
│   │   │   └── Login.jsx
│   │   │
│   │   ├── customer/
│   │   │   ├── CustomerDashboard.jsx
│   │   │   └── Properties.jsx
│   │   │
│   │   ├── seller/
│   │   │   └── SellerDashboard.jsx
│   │   │
│   │   ├── agent/
│   │   │   └── AgentDashboard.jsx
│   │   │
│   │   └── admin/
│   │       └── AdminDashboard.jsx
│   │
│   ├── routes/
│   │   ├── ProtectedRoute.jsx
│   │   ├── RoleRoute.jsx
│   │   └── AppRoutes.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔐 Route Protection

EstateHub uses route protection to control access to authenticated pages.

### Protected Routes

Authenticated users can access protected application pages only after successful authentication.

```text
Public
 │
 ├── Login
 │
 ▼
Authentication
 │
 ▼
Protected Routes
 │
 ├── Customer
 │
 ├── Seller
 │
 ├── Agent
 │
 └── Admin
```

### Role-Based Routes

Role-based routing ensures users can access only the pages associated with their assigned role.

```text
CUSTOMER → Customer Dashboard
SELLER   → Seller Dashboard
AGENT    → Agent Dashboard
ADMIN    → Admin Dashboard
```

---

## 🔌 Backend Integration

EstateHub Frontend is designed to communicate with the **EstateHub Spring Boot backend** through REST APIs.

```text
React Frontend
      │
      │ HTTP / REST
      ▼
Spring Boot Backend
      │
      ▼
PostgreSQL Database
```

Backend repository:

**EstateHub Backend**

```text
https://github.com/denethSaputhanthri/real-estate-management-system-backend
```

---

## ⚙️ Environment Configuration

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

> Keep environment files containing sensitive configuration out of version control.

The `.env` file should be included in `.gitignore`.

---

## 📋 Prerequisites

Before running the project, make sure you have:

* Node.js
* npm
* Git
* EstateHub Backend running locally

Check Node.js:

```bash
node -v
```

Check npm:

```bash
npm -v
```

---

## 📥 Installation

Clone the repository:

```bash
git clone https://github.com/denethSaputhanthri/estatehub-frontend.git
```

Navigate to the project:

```bash
cd estatehub-frontend
```

Install dependencies:

```bash
npm install
```

Create the environment file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

---

## ▶️ Running the Application

Start the development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

---

## 🏗️ Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 🧪 Code Quality

Run ESLint:

```bash
npm run lint
```

Fix linting issues where possible before committing changes.

---

## 🚀 Future Development

Planned features include:

* JWT authentication integration
* Property listing management
* Property creation and editing
* Property image uploads
* Property search and filtering
* Advanced property details
* Customer property inquiries
* Favorite properties
* Property viewing appointments
* Seller property management
* Agent property management
* Admin user management
* Admin property moderation
* Pagination
* Sorting
* Advanced search
* Notifications
* User profile management
* Responsive mobile improvements

---

## 🎯 Project Goals

EstateHub is designed to demonstrate modern frontend development practices while building a realistic real estate management platform.

The project focuses on:

* Component-based architecture
* Reusable React components
* Secure route handling
* Role-based authorization
* REST API integration
* Responsive UI development
* Maintainable project structure
* Scalable frontend architecture

---

## 🔗 Related Project

### EstateHub Backend

Spring Boot backend providing REST APIs, security, database management, and business logic.

```text
https://github.com/denethSaputhanthri/real-estate-management-system-backend
```

---

## 👨‍💻 Author

**Deneth Saputhanthri**

Software Engineering Undergraduate
Colombo, Sri Lanka

GitHub:

```text
https://github.com/denethSaputhanthri
```

---

## 📄 License

This project is developed for learning, portfolio, and software engineering practice purposes.
