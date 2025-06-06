# SmartPOS: Restaurant Management System

## Overview

SmartPOS is a comprehensive restaurant management system built with Node.js, Express, and MongoDB. It provides a robust API for managing restaurant operations with role-based authentication, order management, and inventory control.

## Features

- **Role-Based Authentication:** Secure access control with six distinct roles:
  - Owner: Full system access and management capabilities
  - Manager: Restaurant operations and staff management
  - Waiter: Order taking and table management
  - Cashier: Payment processing and billing
  - Chef: Kitchen order management and inventory
  - Administrator: System configuration and user management

- **User Management:**
  - User registration with role assignment
  - Secure login with JWT authentication
  - Password encryption with salt rounds

## Technology Stack

- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JSON Web Token (JWT)
- **Password Security:** Bcrypt
- **Validation:** Zod
- **Environment:** Node.js

## API Endpoints

### Authentication

#### User Registration
- **Endpoint:** `/api/auth/registration`
- **Method:** `POST`
- **Description:** Register a new user with role assignment

#### User Login
- **Endpoint:** `/api/auth/login`
- **Method:** `POST`
- **Description:** Authenticate user and receive JWT token

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env`:
```
PORT=5000
DATABASE_URL=your_mongodb_connection_string
DEV_ENVIRONMENT=development
Salt_Rounds=10
SECRET=your_jwt_secret
```

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server port number |
| DATABASE_URL | MongoDB connection string |
| DEV_ENVIRONMENT | Development environment setting |
| Salt_Rounds | Number of salt rounds for password hashing |
| SECRET | JWT secret key |

## Security

- Passwords are hashed using bcrypt with configurable salt rounds
- JWT tokens are used for session management
- Role-based access control for API endpoints

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any queries or support, please contact:
- Email: [mullah725@gmail.com](mailto:mullah725@gmail.com), [islam35-1048@diu.edu.bd](mailto:islam35-1048@diu.edu.bd)

## Links

- [Node.js Documentation](https://nodejs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [JWT Introduction](https://jwt.io/introduction)
- [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)
- [Zod Documentation](https://zod.dev/)
