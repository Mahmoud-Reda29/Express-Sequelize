
# Node.js API Project

## Overview

This project is a Node.js API built with Express and Sequelize. It provides endpoints for managing users, posts, and comments. The API supports CRUD operations and includes features such as user authentication, soft deletes, and eager loading of related data.

## Features

- User management (create, update, delete, retrieve)
- Post management (create, update, delete, retrieve)
- Comment management (create, update, delete, retrieve)
- Soft deletes for posts
- Eager loading of related data (users, posts, comments)
- Authentication middleware
- Validation and error handling
- Postman collection for testing endpoints

## Technologies Used

- Node.js
- Express
- Sequelize
- MySQL/MariaDB
- JWT for authentication
- Postman for API testing

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Mahmoud-Reda29/Express-Sequelize.git
   cd express-sequelize
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up the database:
   - Create a MySQL/MariaDB database.
   - Update the database configuration in 

connection.js

.

4. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Users

- `GET /users` - Retrieve all users
- `POST /users/signup` - Create a new user (with email existence check)
- `GET /users/by-email` - Retrieve a user by email
- `GET /users/:id` - Retrieve a user by ID
- `PUT /users/:id` - Create or update a user by ID

### Posts

- `POST /posts` - Create a new post
- `DELETE /posts/:id` - Delete a post by ID (only the owner can delete)
- `GET /posts/with-comments-count` - Retrieve all posts with the count of comments

### Comments

- `POST /comments` - Create bulk comments
- `PATCH /comments/:commentId` - Update a comment by ID
- `GET /comments/newest/:postId` - Retrieve the 3 most recent comments for a specific post
- `POST /comments/find-or-create` - Find or create a comment
- `GET /comments/search` - Retrieve comments containing a specific word
- `GET /comments/:commentId` - Retrieve a specific comment by ID with user and post information

## Postman Collection

A Postman collection is available for testing the API endpoints. You can import the collection into Postman to easily test all the endpoints.

1. Postman Collection file: https://routemr.postman.co/workspace/routeMR-Workspace~33d9cbab-7eee-4a68-8b6d-84e2b62ca6c6/collection/37529607-c006c99a-0203-4083-9e3f-47c2edf24fe8?action=share&creator=37529607





