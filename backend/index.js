const cookieSession = require('cookie-session');
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const authRoute = require('./routes/authRoute');
const ContactRoutes = require('./routes/contactRoute');
const mongoose = require('mongoose');

const app = express();

const MONGODB_URL =
  'mongodb+srv://jesuisstan:qweasZ87@cluster0.rbmyens.mongodb.net/ContactBookApp?retryWrites=true&w=majority';
const PORT = 9999;

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(err));

app.use(
  cookieSession({
    name: 'session',
    keys: ['ContactBookFullstackApp'],
    maxAge: 24 * 60 * 60 * 100
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(cors());
//app.use(
//  cors({
//    origin: 'http://localhost:3333',
//    methods: 'GET,POST,PUT,DELETE',
//    credentials: true
//  })
//);

// Routes
app.use(ContactRoutes);
app.use('/', authRoute);

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
