<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0a66c2&height=100&section=header" />
</div>

<div align="center">

# 🚀 Vishal Attri Portfolio
### ☁️ Cloud Engineer (Aspirant) | 💻 Full Stack Developer

<p align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=22&duration=3000&pause=500&color=0a66c2&center=true&width=500&lines=Cloud+Engineer+in+the+making;Full+Stack+Developer;Building+scalable+systems;Always+learning+new+things!" />
</p>

[![GitHub followers](https://img.shields.io/github/followers/Attrivishal?style=for-the-badge&logo=github&color=0a66c2)](https://github.com/Attrivishal)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0a66c2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/vishalattri)
[![Portfolio](https://img.shields.io/badge/Portfolio-Live-ff6b6b?style=for-the-badge&logo=google-chrome)](http://13.222.120.250)

</div>

---

## Overview

This repository contains a polished personal portfolio website for Vishal Attri. It is built with a React frontend and an Express/MongoDB backend to support contact form submissions and message management.

The project is designed to showcase:
- professional profile and skills
- cloud and full-stack experience
- interactive UI components and animations
- a secure contact form with message persistence

---

## Features

- Modern React + Vite frontend
- Backend API with Express and MongoDB
- Secure middleware: Helmet, CORS, rate limiting, request validation
- Contact form with message storage and optional role filtering
- Smooth animations and intersection-based page reveals
- Docker-ready deployment

---

## Tech Stack

- Frontend: React, Vite, React Router, Framer Motion, react-hot-toast
- Backend: Node.js, Express, MongoDB, Mongoose
- Security: Helmet, express-rate-limit, CORS
- Deployment: Docker, optionally hosted on a cloud VM

---

## Repository Structure

- `client/` — React frontend source code
- `server/` — Express backend and API routes
- `server/models/` — Mongoose data models
- `server/routes/` — REST API route handlers
- `Dockerfile` — container definition for the portfolio app
- `ecosystem.config.js` — process config for deployment
- `aws_deployment_guide.md` — deployment notes for AWS

---

## Local Setup

### Prerequisites

- Node.js 18+ and npm
- MongoDB connection URI
- `npm` or `pnpm`

### Start the backend

```bash
cd portfolio/server
npm install
cp .env.example .env
# update .env with MONGODB_URI and FRONTEND_URL
npm run dev
```

The backend runs on `http://localhost:5001` by default.

### Start the frontend

```bash
cd ../client
npm install
npm run dev
```

Open the app on the local Vite URL shown in your terminal.

---

## Docker

Build and run the app using Docker:

```bash
docker build -t portfolio-app .

docker run -d -p 3000:80 portfolio-app
```

This image packages the full portfolio for production-style deployment.

---

## Environment Variables

The backend expects the following variables in `server/.env`:

- `PORT` — optional API port, defaults to `5001`
- `MONGODB_URI` — MongoDB connection string
- `FRONTEND_URL` — allowed frontend origin for CORS

---

## API Endpoints

- `POST /api/contact` — submit contact form messages
- `GET /api/contact/messages` — list submitted messages
- `PATCH /api/contact/:id/read` — mark a message as read
- `GET /api/health` — health check endpoint

---

## Notes

- The contact backend includes rate limiting and form validation.
- For production, add authentication to message endpoints.
- `client/package.json` uses Vite for fast development and build tooling.

---

## Connect with Me

- GitHub: https://github.com/Attrivishal
- LinkedIn: https://linkedin.com/in/vishalattri
- Portfolio: http://13.222.120.250

---

## License

This project is available under the MIT License.
