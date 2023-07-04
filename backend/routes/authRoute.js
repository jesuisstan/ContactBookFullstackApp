const router = require('express').Router();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');
const session = require('express-session');

const CLIENT_URL = 'http://localhost:3333/';
let user = {};

const GOOGLE_CLIENT_ID =
  '629983254497-5jcucfp16tu0h1mf4u1aujru405r0aar.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

const GITHUB_CLIENT_ID = 'Iv1.7a769ec0b6e24422';
const GITHUB_CLIENT_SECRET = '73bea910a8d43587b5d1bf229308c5704c0bd8ea';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

//app.use(session({
//  secret: 'your-secret-key',
//  resave: false,
//  saveUninitialized: false
//}));

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
      callbackURL: 'http://localhost:9999/auth/github/callback/'
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
  res.header('Access-Control-Allow-Origin', 'http://localhost:3333');
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
