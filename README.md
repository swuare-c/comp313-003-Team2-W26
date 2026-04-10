# ChatGPT-Powered Listening Companion

The ChatGPT-Powered Listening Companion is a web application designed to provide individuals with a safe, accessible, and scalable platform for emotional expression and reflection. The application allows users to type their thoughts, concerns, or daily reflections, and leverages ChatGPT-powered responses to paraphrase their input and generate neutral, thoughtful follow-up questions.

This project demonstrates how **AI can support active listening and emotional expression**, while practicing full‑stack software development.

------------------------------------------------------------------------

# Technology Stack

## Frontend

-   React

## Backend

-   Node.js
-   Express

## Database

-   MongoDB

## AI Integration

-   OpenAI API

## Authentication

-   JWT (JSON Web Token)
-   bcrypt password hashing

------------------------------------------------------------------------

# Environment Variables

The backend requires an **OpenAI API key**.

For security reasons, the real `.env` file is **not included in the repository**.

Instead, a template file is provided:

    .env.example

You must create your own `.env` file.

## Setup

Navigate to the backend folder:

    cd backend

Create a `.env` file and copy the contents of `.env.example`.

Example:

    OPENAI_API_KEY=your_openai_api_key_here

note: `.env` is listed in `.gitignore` so sensitive information is never committed to GitHub.

------------------------------------------------------------------------

# Installation

Clone the repository:

    git clone https://github.com/swuare-c/comp313-003-Team2-W26.git
    cd comp313-003-Team2-W26

## Install Backend Dependencies

    cd backend
    npm install

## Install Frontend Dependencies

    cd frontend
    npm install

------------------------------------------------------------------------

# Running the Application

Both backend and frontend must be running.

## Start MongoDB

Before starting the backend server, ensure that MongoDB is running.

On Windows, start MongoDB by running: mongod.exe

## Start Backend

    cd backend
    npm run dev

Backend server:

    http://localhost:5000

## Start Frontend

Open another terminal:

    cd frontend
    npm run dev

Frontend application:

    http://localhost:5173

------------------------------------------------------------------------

# OpenAI Usage

This project integrates the **OpenAI API** to generate conversational responses for the listening companion.

If the API key (OPENAI_API_KEY) is missing or the quota is exceeded, the application falls back to a **local response**, so the system continues to function.

------------------------------------------------------------------------

# Security Notes

-   Passwords are hashed using **bcrypt**
-   Authentication uses **JWT tokens**
-   Password reset tokens expire after **1 hour**
-   The password reset endpoint does not reveal whether an email exists (prevents account enumeration)
-   Sensitive credential of **OPENAI_API_KEY** are stored in `.env` and excluded from version control

------------------------------------------------------------------------

# Educational Purpose

This project was developed to demonstrate:

-   Full‑stack web development
-   API integration
-   Secure authentication
-   AI‑assisted applications

------------------------------------------------------------------------

# License

This project is intended for **educational purposes**.
