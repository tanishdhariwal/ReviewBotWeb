
---

# ReviewBot Backend

The backend of **ReviewBot** is built using **Node.js** and **Express**. It handles the core server-side logic, user operations, database interactions, and API routing. It works closely with the frontend and FastAPI server to provide a seamless experience for users.

---

## Project Structure

```plaintext
backend/
├── Controllers/
│   ├── chatControllers.js  # Handles chat-specific logic like scraping and generating chat responses.
│   ├── userControllers.js  # Manages user authentication and profile-related logic.
├── DB/
│   ├── dbconnection.js     # Establishes MongoDB connections.
├── models/
│   ├── Chat.js             # Schema for storing user chats.
│   ├── Feedback.js         # Schema for feedback collection.
│   ├── Product.js          # Schema for product details.
│   ├── User.js             # Schema for user information.
├── routes/
│   ├── chatRoutes.js       # API endpoints for chat functionalities.
│   ├── userRoutes.js       # API endpoints for user operations.
│   ├── index.js            # Aggregates all routes.
├── utils/
│   ├── Icons.js            # Provides helper functions for icons.
│   ├── tokenManager.js     # Utility for managing JWT tokens.
├── .dockerignore           # Excludes files from the Docker build context.
├── Dockerfile              # Docker configuration for the backend.
├── .gitignore              # Excludes unnecessary files from Git.
├── index.js                # Entry point for the backend server.
├── package-lock.json       # Package lock file for dependencies.
├── package.json            # Dependency and script configuration.

```

---

## Chat Routes

These routes handle chat-related operations. They are protected and require user authentication through the `verifyToken` middleware.

- `GET /new`: A test endpoint to check the chat server.
- `POST /chat_response`: Handles generating a chat response.
- `POST /product_url_validation`: Validates and scrapes product URLs.
- `POST /get_user_chat`: Fetches a specific user's chat.
- `GET /get_product/:asin`: Retrieves product details using the ASIN.
- `DELETE /delete_user_chat/:asin`: Deletes a user’s chat based on the ASIN.

---

## User Routes

These routes manage user operations like authentication and profile management. They also require token verification for most actions.

- `POST /signup`: Registers a new user.
- `POST /login`: Logs in a user.
- `POST /change_password`: Allows users to change their password.
- `GET /logout`: Logs out a user.
- `GET /authstatus`: Verifies the user’s authentication status.
- `GET /get_user`: Fetches user details.
- `GET /get_user_chats`: Retrieves a user’s chat history.
- `POST /feedback`: Allows users to submit feedback.
- `GET /`: A test endpoint to check the server.

---

## Environment Variables

The backend requires environment variables to run properly. Create a `.env` file in the backend directory and configure it as follows:

- `PORT=5000`: The port the backend server will run on.
- `MONGO_URI=<your-mongodb-cloud-uri>`: The MongoDB URI for the database (cloud).
- `MONGO_URI1=mongodb://localhost:27017/AUTH`: Local MongoDB URI (for development).
- `JWT_SECRET=<your-jwt-secret>`: Secret key used for JWT tokens.
- `COOKIE_NAME=<your-cookie-name>`: Name for session cookies.
- `FRONTEND_URL=localhost`: URL of the frontend application.

---

## Setup Instructions

1. Clone the repository and navigate to the backend directory.
   ```bash
   git clone https://github.com/Bharadwajreddy1406/ReviewBot.git
   cd ReviewBot/backend
   ```

2. Install the required dependencies.
   ```bash
   npm install
   ```

3. Create a `.env` file and add your environment variables in the specified format.

4. Start the server.
   ```bash
   npm start
   ```

Now the backend server should be running at `http://localhost:5000`.

--- 
