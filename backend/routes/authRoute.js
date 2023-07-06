require('dotenv').config();
const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const session = require('express-session');

const HOST = process.env.HOST || 'localhost';
const FRONTEND_PORT = process.env.FRONTEND_PORT || '3333';
const SERVER_PORT = process.env.SERVER_PORT || '9999';

const CLIENT_URL = `http://${HOST}:${FRONTEND_PORT}/`;

let user = {};

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    function (accessToken, refreshToken, profile, cb) {
      user = {
        id: profile.id,
        username: profile.displayName,
        avatar: profile.photos[0].value,
        provider: profile.provider
      };
      return cb(null, profile);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: `http://${HOST}:${SERVER_PORT}/auth/github/callback/`
    },
    function (accessToken, refreshToken, profile, cb) {
      user = {
        id: profile.id,
        username: profile.displayName,
        avatar: profile.photos[0].value,
        provider: profile.provider
      };
      return cb(null, profile);
    }
  )
);

router.get('/', (req, res) => {
  res.send('Bonjour from ContactBookFullstackApp');
});

router.get('/auth/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user
      // cookies: req.cookies
    });
  }
});

router.get('/auth/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure'
  });
});

router.get('/auth/getuser', (req, res) => {
  console.log('getting user data...');
  res.header('Access-Control-Allow-Origin', CLIENT_URL);
  res.send(user);
});

router.get('/auth/logout', (req, res) => {
  req.logout();
  user = {
    id: '',
    username: '',
    avatar: '',
    provider: ''
  };
  res.redirect(CLIENT_URL);
});

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/login/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${CLIENT_URL}contactbook`);
  }
);

router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['profile'] })
);

router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(`${CLIENT_URL}contactbook`);
  }
);

module.exports = router;
