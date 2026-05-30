<div align="center">

# 🌍 Fluently

### AI-Native Language Learning Platform

Practice languages naturally through real-time messaging, video calls, and AI-powered learning experiences.

![React]([https://img.shields.io/badge/React-Frontend-blue](https://img.shields.io/badge/React-Frontend-blue))

![Node.js]([https://img.shields.io/badge/Node.js-Backend-green](https://img.shields.io/badge/Node.js-Backend-green))

![MongoDB]([https://img.shields.io/badge/MongoDB-Database-green](https://img.shields.io/badge/MongoDB-Database-green))

![Stream]([https://img.shields.io/badge/Stream-Chat%20%26%20Video-orange](https://img.shields.io/badge/Stream-Chat%20%26%20Video-orange))

![Ollama]([https://img.shields.io/badge/Ollama-AI-purple](https://img.shields.io/badge/Ollama-AI-purple))

![License]([https://img.shields.io/badge/License-MIT-yellow](https://img.shields.io/badge/License-MIT-yellow))

</div>

---

## Overview

Fluently is a full-stack language learning platform designed to connect learners through meaningful conversations instead of traditional passive learning methods.

The platform enables users to discover language partners, build connections, exchange messages in real time, join video calls, and leverage AI-powered learning tools to improve fluency through practical communication.

By combining social interaction, real-time communication, and AI assistance, Fluently creates an immersive environment for language acquisition.

---

## Features

### Authentication & User Management

- Secure JWT Authentication

- HTTP-only Cookie Sessions

- User Onboarding Workflow

- Language Preference Setup

- Protected Routes

### Social Learning Network

- Discover Language Partners

- Friend Request System

- Accept / Reject Requests

- Personalized User Profiles

### Real-Time Communication

- Instant Messaging

- Persistent Chat History

- Stream Chat Integration

- Online Learning Conversations

### Video Calling

- One-to-One Video Calls

- Real-Time Communication

- Stream Video SDK Integration

### AI-Powered Learning

- AI Language Coach

- Vocabulary Assistance

- Interactive Practice Sessions

- Local LLM Integration using Ollama

### Modern User Experience

- Glassmorphism UI

- Responsive Design

- Modern Dashboard Layout

- Smooth Navigation Experience

---

## Tech Stack

### Frontend

- React

- Vite

- Tailwind CSS

- DaisyUI

- Zustand

- TanStack Query

- Axios

### Backend

- Node.js

- Express.js

- JWT Authentication

- Cookie-Based Session Management

### Database

- MongoDB

- Mongoose

### Real-Time Infrastructure

- Stream Chat SDK

- Stream Video SDK

### AI Layer

- Ollama

- Local Language Models

---

## Project Architecture

```text

Frontend (React + Vite)

            │

            ▼

Backend (Node.js + Express)

            │

            ▼

MongoDB Database

            │

            ├── Stream Chat

            │       └── Real-Time Messaging

            │

            ├── Stream Video

            │       └── Video Calling

            │

            └── Ollama

                    └── AI Learning Features

```

---

## Screenshots

### Login Page

![Login Page](screenshots/login_page.png)

---

### Home Page

![Home Page](screenshots/home_page.png)

---

### AI Coach

![AI Coach](screenshots/ai_coach.png)

---

### Vocabulary Builder

![Vocabulary Builder](screenshots/vocabulary.png)

---

### Practice Sessions

![Practice](screenshots/practice.png)

---

## Project Structure

```text

fluently/

│

├── backend/

│   └── src/

│       ├── controllers/

│       ├── middleware/

│       ├── models/

│       ├── routes/

│       └── lib/

│

├── frontend/

│   └── src/

│       ├── components/

│       ├── hooks/

│       ├── pages/

│       ├── store/

│       └── lib/

│

├── screenshots/

│

├── docs/

│

└── [README.md](http://README.md)

```

---

## Local Setup

### Clone Repository

```bash

git clone [https://github.com/adars-h-agrawal/fluently.git](https://github.com/adars-h-agrawal/fluently.git)

cd fluently

```

### Install Dependencies

```bash

cd backend

npm install

cd ../frontend

npm install

```

### Configure Environment Variables

Backend `backend/.env`)

```env

PORT=5001

MONGO_URI=

JWT_SECRET=

STREAM_API_KEY=

STREAM_API_SECRET=

CLIENT_URL=

```

Frontend `frontend/.env`)

```env

VITE_STREAM_API_KEY=

VITE_API_BASE_URL=

```

### Start Backend

```bash

cd backend

npm run dev

```

### Start Frontend

```bash

cd frontend

npm run dev

```

Frontend runs on:

```text

[http://localhost:5173](http://localhost:5173)

```

Backend runs on:

```text

[http://localhost:5001](http://localhost:5001)

```

---

## Core Functionalities

- User Registration & Login

- Secure Authentication

- User Onboarding

- Friend Request System

- Real-Time Messaging

- Video Calling

- AI Learning Assistance

- Vocabulary Building

- Interactive Practice Sessions

- Session Persistence

- Protected Routes

---

## Future Improvements

- Speech-to-Text Practice

- Pronunciation Analysis

- AI-Generated Lesson Plans

- Learning Progress Analytics

- Gamification System

- Group Learning Rooms

- Mobile Application

---

## License

This project is licensed under the MIT License.

See the LICENSE file for details.

---

## Acknowledgements

- Stream Chat

- Stream Video

- MongoDB

- React

- Express

- Tailwind CSS

- Ollama

---

⭐ If you found this project interesting, consider giving it a star.