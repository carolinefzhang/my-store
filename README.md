# My Store - MERN Stack E-commerce Application

A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring product management, authentication, and authorization.

## Features

- **Product Management**: Create, read, update, and delete products
- **Authentication**: Auth0 integration for secure user authentication
- **Authorization**: Role-based access control using Permit.io
- **Responsive UI**: Modern interface built with Chakra UI and React
- **State Management**: Zustand for efficient state management
- **Dark/Light Mode**: Theme switching capability
- **Docker Support**: Containerized deployment ready

## Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **Auth0** for authentication
- **Permit.io** for authorization and permissions
- **JWT** for token handling

### Frontend
- **React 19** with Vite
- **Chakra UI** for component library
- **React Router** for navigation
- **Zustand** for state management
- **Auth0 React SDK** for authentication
- **Framer Motion** for animations

## Project Structure

```
my-store/
├── backend/                 # Express.js API server
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication & authorization
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── server.js          # Main server file
├── frontend/              # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React contexts
│   │   ├── pages/         # Page components
│   │   └── store/         # Zustand stores
│   └── public/            # Static assets
├── .github/               # CI/CD workflows
├── docker-compose.yml     # Docker configuration
└── Dockerfile            # Container definition
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- Auth0 account
- Permit.io account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm install --prefix frontend
   ```

3. **Environment Setup**
   
   Create `.env` in the root directory:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5001
   PERMIT_API_KEY=your_permit_api_key
   PERMIT_PDP_URL=https://cloudpdp.api.permit.io
   AUTH0_DOMAIN=your_auth0_domain
   ```

   Create `frontend/.env`:
   ```env
   VITE_AUTH0_AUDIENCE=https://mern-store-api
   VITE_AUTH0_DOMAIN=your_auth0_domain
   VITE_AUTH0_CLIENT_ID=your_auth0_client_id
   VITE_AUTH0_REDIRECT_URI=http://localhost:5001/callback
   ```

### Running the Application

**Development Mode:**
```bash
npm run dev
```

**Production Build:**
```bash
npm run build
npm run build:backend
npm start
```

**Using Docker:**
```bash
docker-compose up
```

The application will be available at `http://localhost:5001`

## API Endpoints

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product (authenticated)
- `PUT /api/products/:id` - Update a product (authenticated)
- `DELETE /api/products/:id` - Delete a product (authenticated)

## Authentication & Authorization

- **Auth0** handles user authentication
- **Permit.io** manages role-based permissions
- Protected routes require valid JWT tokens
- Authorization middleware checks user permissions

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request