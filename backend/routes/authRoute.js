import express from "express";
import { googleAuth, signin, signup } from "../controllers/auth.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

//CREATE A USER
router.post("/signup", signup)

//SIGN IN
router.post("/signin", signin)

//GOOGLE AUTH
router.post("/google", googleAuth)


// Middleware to verify the authentication token
export const authenticateMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);
    req.userId = decoded.id; // Set the user ID in the request object for further processing
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid authorization token.' });
  }
};

export default router;
