import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/usersRoute.js';
import authRoutes from './routes/authRoute.js';
import contactsRoutes from './routes/contactsRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Load .env from root folder
dotenv.config({ path: path.resolve(__dirname, '../.env') });

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


// Keep-alive ping to prevent Render.com from sleeping
const ping = async (url) => {
  try {
    await fetch(url);
    console.log(`Ping success: ${url}`);
  } catch (error) {
    console.error(`Ping failed: ${url}`, error);
  }
};

// Start keep-alive pings every 5 minutes
const startKeepAlive = () => {
  const frontendUrl = process.env.FRONTEND_URL;
  const backendUrl = process.env.REACT_APP_BACKEND_URL 
    ? `${process.env.REACT_APP_BACKEND_URL}/api/check`
    : `http://localhost:${process.env.REACT_APP_SERVER_PORT || 9999}/api/check`;

  if (frontendUrl || process.env.NODE_ENV === 'production') {
    setInterval(() => {
      if (frontendUrl) {
        ping(frontendUrl);
      }
      ping(backendUrl);
    }, 5 * 60 * 1000); // every 5 minutes
    
    console.log('Keep-alive ping started (every 5 minutes)');
    if (frontendUrl) {
      console.log(`Frontend URL: ${frontendUrl}`);
    }
    console.log(`Backend URL: ${backendUrl}`);
  }
};

startKeepAlive();