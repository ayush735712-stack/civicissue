https://civicissue-eight.vercel.app/
# CivicFix — Civic Issue Reporting Platform

CivicFix is a full-stack civic issue reporting platform that allows citizens to report public problems such as potholes, garbage overflow, broken streetlights, and water leakage.

The platform provides a centralized system for submitting, tracking, filtering, and managing civic complaints.

## 🚀 Features

### 👤 Citizen Features

- Report civic issues through an easy-to-use form
- Add issue title and detailed description
- Select issue category and priority
- Provide location information
- Upload supporting images
- Track complaints using a unique Complaint ID
- View complaint status and timeline
- View reported issues on an interactive map

### 🛠️ Admin / Department Features

- View submitted complaints
- Filter complaints by status and category
- Assign complaints to relevant departments
- Update complaint status
- Maintain a complaint activity timeline
- Monitor civic issues geographically

### 🔐 Backend Features

- RESTful API built with Node.js and Express
- MongoDB Atlas database integration
- Mongoose ODM
- Environment-based configuration
- Structured routes, controllers, models, and middleware
- Input validation and structured API error responses
- Development fallback mode when MongoDB is unavailable
- Unique complaint IDs such as `CF-2026-1001`

---

## 🧰 Tech Stack

### Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- MongoDB Atlas
- Mongoose
- dotenv

### Development Tools

- Git
- GitHub
- VS Code / Antigravity
- Postman / Thunder Client

---

## 🏗️ Architecture

```text
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │                     │
                    │  Report / Track /   │
                    │  Map / Admin        │
                    └──────────┬──────────┘
                               │
                               │ HTTP REST API
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │                     │
                    │ Routes → Controllers│
                    │        → Models     │
                    └──────────┬──────────┘
                               │
                               │ Mongoose
                               ▼
                    ┌─────────────────────┐
                    │    MongoDB Atlas    │
                    │                     │
                    │     Complaints      │
                    └─────────────────────┘
