# GPREC CLUBS - College Clubs & Events Management System.

By - DIVITE DINESH (229X1A33A4) III CSM

## Overview

This project is built to efficiently manage and showcase college clubs, streamline club data management, and provide a one-stop platform for listing all college events. It helps freshers understand the club culture and stay updated on events happening in the college.

Developed in less than 10 days, this project was built entirely from scratch.

## Features

### Club & Event Management

- Faculty coordinators have individual logins for their respective clubs.
- Faculty members can update club information, upload images to the club gallery, and post new events.
- Admin approval is required for all modifications to ensure data accuracy.
- CRUD operations for managing clubs and events.

### AI-Powered College Bot

- AI bot assists students with queries related to clubs, events, and general college information.
- Fast and accurate responses.

### User Roles

- Admin: Oversees all club and event data, approves or rejects faculty modifications.
- Faculty Coordinators: Manage club-related content, propose event details.
- Students: View club details, explore event listings, and interact with the AI bot.

## Tech Stack

- Frontend: React (Vite), Bootstrap
- Backend: Node.js, Express.js, MongoDB
- AI Integration: Google Generative AI
- Authentication: JWT, Bcrypt

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI Components (Navbar, Footer, etc.)
│   ├── pages/             # Pages (Home, Clubs, Events, etc.)
│   ├── assets/            # Images & Static Assets
├── public/                # Static Files
├── package.json           # Frontend Dependencies
└── vite.config.js         # Vite Configuration

backend/
├── models/                # Database Models (Admin, User, Club, Event)
├── controllers/           # Business Logic (CRUD Operations)
├── routes/                # API Routes
├── services/              # Service Layer
├── middleware/            # Authentication & Error Handling
├── db/                    # MongoDB Connection
├── server.js              # Main Server File
└── package.json           # Backend Dependencies
```

## Database Schema

```
+----------------+       +----------------+       +----------------+       +----------------+
|     Admin      |       |      User      |       |      Club      |       |      Event     |
+----------------+       +----------------+       +----------------+       +----------------+
| - _id          |       | - _id          |       | - _id          |       | - _id          |
| - name         |       | - name         |       | - name         |       | - name         |
| - email        |       | - email        |       | - description  |       | - description  |
| - password     |       | - password     |       | - adminId      |<------| - clubId       |
| - role         |       | - role         |       | - members      |       | - date         |
+----------------+       +----------------+       +----------------+       +----------------+
```

## Setup & Installation

### Clone the Repository

```
git clone https://github.com/YOUR_USERNAME/college-clubs-events.git
cd college-clubs-events
```

### Install Dependencies

```
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### Set Up Environment Variables

Create `.env` files in both `frontend/` and `backend/` directories and configure:

```
# Backend .env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_AI_KEY=your_google_ai_key
PORT=5000
```

```
# Frontend .env
VITE_API_URL=http://localhost:5000
```

### Run the Application

```
# Start Backend
cd backend
npm start

# Start Frontend
cd frontend
npm run dev
```

## Future Enhancements

- Live Hosting & Deployment
- Enhanced AI Features for FAQs and Event Recommendations
- UI Improvements and Performance Optimization

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome. Feel free to fork the repository and submit pull requests.

Developed by [Your Name](https://github.com/YOUR_USERNAME).

