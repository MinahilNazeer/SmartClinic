# 🏥 Smart Clinic Management System

A full-stack **MERN** web application developed to simplify the management of a small clinic. The system allows clinic staff to manage patients, doctors, appointments, billing, and view dashboard statistics through an intuitive and responsive interface.

---

## Features

### 🔐 Authentication
- User Registration
- User Login with JWT Authentication
- Forgot Password

### 📊 Dashboard
- Total Patients
- Total Doctors
- Total Appointments
- Total Revenue (Paid Bills Only)
- Recent Patients
- Appointment Statistics Chart

### 👨‍⚕️ Patient Management
- Add Patient
- View Patients
- Update Patient
- Delete Patient

### 🩺 Doctor Management
- Add Doctor
- View Doctors
- Update Doctor
- Delete Doctor

### 📅 Appointment Management
- Book Appointment
- Update Appointment
- Cancel Appointment

### 💳 Billing
- Generate Bills
- Payment Status (Pending/Paid)
- Revenue Calculation

### 📱 Responsive Design
- Mobile-friendly interface
- Responsive Sidebar with Hamburger Menu

---

# 🛠️ Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Recharts
- React Icons

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- CORS

## Development Tools
- VS Code
- Git & GitHub
- Thunder Client

---

# 📂 Project Structure

```
SmartClinic
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/MinahilNazeer/SmartClinic.git

cd SmartClinic
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install

npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

# 📡 API Endpoints

## Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`
- PUT `/api/auth/forgot-password`

## Patients

- GET `/api/patients`
- POST `/api/patients`
- PUT `/api/patients/:id`
- DELETE `/api/patients/:id`

## Doctors

- GET `/api/doctors`
- POST `/api/doctors`
- PUT `/api/doctors/:id`
- DELETE `/api/doctors/:id`

## Appointments

- GET `/api/appointments`
- POST `/api/appointments`
- PUT `/api/appointments/:id`
- DELETE `/api/appointments/:id`

## Bills

- GET `/api/bills`
- POST `/api/bills`
- PUT `/api/bills/:id`
- DELETE `/api/bills/:id`

## Dashboard

- GET `/api/dashboard`

---

# 📸 Screenshots

Add screenshots of:

- Login Page
- Dashboard
- Patient Management
- Doctor Management
- Appointment Management
- Billing Page

---

# 🌐 Live Demo
https://minahilnazeer.github.io/SmartClinic/

# 🚀 Future Improvements

- Email verification
- Secure password reset using OTP or email token
- Role-based authentication (Admin, Doctor, Receptionist)
- Search and filtering
- Pagination
- Export reports as PDF
- Appointment reminders
- Dark Mode

---

# 👩‍💻 Author

**Minahil Nazeer**

BS Computer Science Student  
Quaid-i-Azam University

GitHub:
https://github.com/MinahilNazeer

---

# 📄 License

This project was developed for educational and internship assessment purposes.
