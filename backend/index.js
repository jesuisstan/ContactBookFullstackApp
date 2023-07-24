import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/usersRoute.js';
import authRoutes from './routes/authRoute.js';
import contactsRoutes from './routes/contactsRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();

dotenv.config();
const PORT = process.env.SERVER_PORT;

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

//app.use(
//  cors({
//    origin: `${process.env.HOST}:${process.env.FRONTEND_PORT}`,
//    methods: 'GET,POST,PUT,DELETE',
//    credentials: true
//  })
//);

// 1. Set up the proxy trust
app.set('trust proxy', 1);

//// 2. Set the global prefix
//app.use('/api', (req, res, next) => {
//  // This middleware will add the '/api' prefix to all your routes
//  req.url = '/api' + req.url;
//  next();
//});

// 3. Use the proxy setting in CORS
app.use(
  cors({
    origin: `${process.env.HOST}:${process.env.FRONTEND_PORT}`,
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
    // Add the following line to enable the proxy setting for CORS
    proxy: true,
  })
);

//middlewares
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/', contactsRoutes);

//error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || 'Something went wrong!';
  return res.status(status).json({
    success: false,
    status,
    message
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log('Server is running on port ' + process.env.SERVER_PORT);
  connect();
});
