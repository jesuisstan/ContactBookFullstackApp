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

app.use(
  cors({
    origin: 'http://localhost:3333',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
  })
);

// Setup express-session middleware
//app.use(
//  session({
//    secret: 'your-secret-key', // Replace with a strong secret key
//    resave: false,
//    saveUninitialized: false,
//    store: MongoStore.create({ mongoUrl: process.env.MONGO }) // Use MongoDB to store sessions
//  })
//);

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

app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
  connect();
});
