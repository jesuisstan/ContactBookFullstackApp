import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/usersRoute.js';
import authRoutes from './routes/authRoute.js';
import contactsRoutes from './routes/contactsRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

dotenv.config();

app.use(express.json());

const connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log('Connected to DB');
    })
    .catch((err) => {
      throw err;
    });
};

// Configure CORS allowed origins
const getAllowedOrigins = () => {
  const origins = [];

  // Add FRONTEND_URL if provided (for production like Render.com)
  if (process.env.FRONTEND_URL) {
    origins.push(process.env.FRONTEND_URL);
  }

  // Add localhost origins for local development
  if (process.env.FRONTEND_PORT) {
    origins.push(`http://localhost:${process.env.FRONTEND_PORT}`);
  }

  // Add host-based origin if FRONTEND_URL is not set (backward compatibility)
  if (
    !process.env.FRONTEND_URL &&
    process.env.REACT_APP_HOST &&
    process.env.FRONTEND_PORT
  ) {
    origins.push(
      `http://${process.env.REACT_APP_HOST}:${process.env.FRONTEND_PORT}`
    );
  }

  return origins.length > 0 ? origins : ['http://localhost:4040'];
};

// Configure CORS middleware
app.use(
  cors({
    origin: getAllowedOrigins(),
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  })
);

// Middlewares
app.use(cookieParser());

app.use('/api/check', (req, res) => {
  res.send('Hello from ContactBookApp server');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contacts', contactsRoutes);

// Error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message
  });
});

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
  console.log('Server is running on port ' + process.env.REACT_APP_SERVER_PORT);
  connect();
});
