# ReviewBot

**ReviewBot** is an AI-powered product review analysis tool that helps users understand reviews better by integrating a chatbot capable of answering queries about products based on customer feedback. Built using the **MERN** stack (MongoDB, Express, React, Node.js) for web development, and **FastAPI** for handling NLP-based analysis.

---

## Project Overview

This app provides users with insights from product reviews by allowing them to interact with a chatbot. Using sentiment analysis and NLP, the bot helps clarify complex or unclear reviews and suggests whether the product is worth purchasing based on user feedback.

---

## Tech Stack

### Frontend
- **React** for the user interface
- **TailwindCSS** for styling
- **Vite** as the development server

### Backend
- **Node.js**
- **Express** for API framework
- **MongoDB** for database management

### NLP Integration
- **FastAPI** for the Python-based NLP server
- **HuggingFace Transformers** for pre-trained NLP models
- **Sentence-BERT** for embedding reviews

---

## Features

- Interactive bot to analyze product reviews.
- Sentiment analysis for providing product review insights.
- User profile management.
- Responsive UI for a smooth user experience.

---

## Setup and Installation

### Prerequisites

- **Node.js** v14+ for the backend and frontend.
- **Python** 3.8+ for FastAPI.

### Clone the Repository

```bash
git clone https://github.com/Bharadwajreddy1406/ReviewBot.git
cd ReviewBot

```

## Project Structure

The ReviewBot project is organized into three main sections:

- **Backend**: Manages core server-side logic and user operations.
- **FastAPI**: Handles NLP tasks like sentiment analysis using pre-trained models.
- **Frontend**: Provides the user interface through a React-based application.

---

## Directory Structure

This directory structure provides an overview of the organization within each section of the project.

### Backend
The backend directory contains the core server-side files for managing user-related operations, database interactions, and API routing. It also includes utility files for token management and other supporting functions. This section uses Node.js and Express for handling API requests.

```plaintext
backend
├── DB
│   └── dbConnection.js          # Database connection configuration
├── models
│   ├── Chat.js                  # Chat model for storing conversation data
│   └── User.js                  # User model for storing user data
├── routes
│   └── userRoutes.js            # Route definitions for user-related operations
├── utils
│   ├── tokenManaging
│   │   └── tokenManager.js      # Utility for managing user tokens
│   └── userControllers.js       # Controllers for handling user operations
├── .env                         # Environment variables
├── .dockerignore                # Docker ignore configuration
├── Dockerfile                   # Dockerfile for building the backend container
├── index.js                     # Main entry point for the backend server
├── package.json                 # Node.js dependencies and scripts
└── package-lock.json            # Lock file for Node.js dependencies
```

## FastAPI

The FastAPI directory manages NLP-related tasks using Python. This section processes product reviews to generate insights and responses for user queries. It includes modules for handling NLP models, scraping APIs, and defining schemas and controllers.

```plaintext
fastapi
├── app
│   ├── Controllers
│   │   ├── __init__.py          # Init file for controllers module
│   │   └── routes.py            # API routes for FastAPI endpoints
│   ├── DB
│   │   ├── __init__.py          # Init file for database module
│   │   └── session.py           # Database session management
│   ├── Helpers
│   │   ├── formatter.py         # Formatting helper for output data
│   │   └── scraperAPI.py        # API for scraping product reviews
│   ├── Model
│   │   ├── NLPModel.py          # NLP model for processing text data
│   │   └── SentimentAnalyzer.py # Sentiment analysis module
│   ├── Schemas
│   │   ├── __init__.py          # Init file for schemas module
│   │   └── models.py            # Data models for request/response validation
│   ├── main.py                  # Entry point for FastAPI app
│   └── HuggingFaceModels        # Pre-trained NLP models from Hugging Face
├── venv                         # Virtual environment for Python dependencies
├── .env                         # Environment variables for FastAPI
├── .gitignore                   # Git ignore configuration
├── Dockerfile                   # Dockerfile for building FastAPI container
└── requirements.txt             # Python dependencies
```

## Frontend
The frontend directory is a React-based setup built with Vite. It provides a user-friendly interface that enables users to interact with the chatbot, view review insights, and manage their accounts. This section uses Tailwind CSS for styling.

```plaintext
frontend
├── public                       # Public assets
├── src
│   ├── components
│   │   └── Context
│   │       ├── AuthContext.jsx  # Authentication context for user sessions
│   │       └── User.js          # User-related functions
│   ├── Helpers                  # Helper functions for frontend logic
│   ├── App.css                  # Main styling file
│   ├── App.jsx                  # Main app component
│   ├── index.css                # Global CSS file
│   ├── main.jsx                 # Entry point for the React app
├── .dockerignore                # Docker ignore configuration
├── .env                         # Environment variables for frontend
├── .gitignore                   # Git ignore configuration
├── Dockerfile                   # Dockerfile for building frontend container
├── index.html                   # Main HTML file
├── package.json                 # React dependencies and scripts
├── package-lock.json            # Lock file for React dependencies
├── postcss.config.js            # PostCSS configuration
├── README.md                    # Documentation for the frontend
├── tailwind.config.js           # Tailwind CSS configuration
└── vite.config.js               # Vite configuration for building the app
```

## Project Modules

### Backend
- **Database (DB)**: Manages connections to the MongoDB database for storing user and chat data.
- **Models**: Defines the database schema for users and chats.
- **Routes**: Contains routing logic for user-related API endpoints.
- **Utils**: Holds utility functions for token management and user controllers.

### FastAPI
- **Controllers**: Defines routes and logic for the FastAPI endpoints.
- **Database (DB)**: Manages database sessions and configurations.
- **Helpers**: Contains utility scripts for formatting and scraping product reviews.
- **Model**: Implements NLP and sentiment analysis models.
- **Schemas**: Defines data schemas for request validation.
- **HuggingFaceModels**: Hosts pre-trained NLP models used for language processing tasks.

### Frontend
- **Components**: Includes reusable UI components and context providers for user authentication.
- **Helpers**: Utility functions for supporting frontend logic.
- **CSS and Styling**: Custom styling files using Tailwind CSS.
- **App**: Main components and entry points for the React application.
