# 🏥 Doctor Appointment System

A full-stack web application for managing doctor appointments. Patients can book, view, and cancel appointments, while doctors can manage their schedules.

---

## 📁 Project Structure

\```
Doctor-Appointment/
├── DOC-Appointment/        # Backend (Node.js / Express)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
├── client/                 # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── README.md
\```

---

## ⚙️ Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

---

## 🚀 Installation & Setup

### 1. Clone the Repository
\```bash
git clone https://github.com/Kate-Pham/Doctor-Appointment.git
cd Doctor-Appointment
\```

### 2. Setup Backend (DOC-Appointment)
\```bash
cd DOC-Appointment
npm install
\```

Create a `.env` file inside `DOC-Appointment/`:
\```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
\```

Start the backend:
\```bash
npm start
\```
Backend runs on: `http://localhost:5000`

---

### 3. Setup Frontend (client)
Open a **new terminal**:
\```bash
cd client
npm install
\```

Create a `.env` file inside `client/`:
\```env
REACT_APP_API_URL=http://localhost:5000
\```

Start the frontend:
\```bash
npm start
\```
Frontend runs on: `http://localhost:3000`

---

## 🌐 Deployment

### Deploy Backend → Render
1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo
3. Set these values:
   - **Root Directory:** `DOC-Appointment`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. Add Environment Variables:
   - `MONGO_URI` = your MongoDB Atlas URL
   - `JWT_SECRET` = your secret key
   - `PORT` = 5000
5. Click **Deploy**

---

### Deploy Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repo
3. Set these values:
   - **Root Directory:** `client`
   - **Framework Preset:** Create React App
4. Add Environment Variable:
   - `REACT_APP_API_URL` = your Render backend URL
5. Click **Deploy**

---

### Deploy Database → MongoDB Atlas
1. Go to [mongodb.com/atlas](https://mongodb.com/atlas) → Create free cluster
2. Create a database user
3. Whitelist IP: `0.0.0.0/0` (allow all)
4. Copy the connection string → paste into `MONGO_URI`

---

## 📝 Environment Variables Summary

### DOC-Appointment/.env
| Variable | Description |
|---|---|
| `PORT` | Backend port (5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for authentication |

### client/.env
| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Backend API URL |

---

## 🛠️ Built With
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT

---

## 👩‍💻 Author
**Kate Pham**
- GitHub: [@Kate-Pham](https://github.com/Kate-Pham)
