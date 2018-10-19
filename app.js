require('dotenv').config
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const FacebookStrategy = require('passport-facebook').Strategy;
const graph = require('fbgraph');
// setting up the model
const User = require('./models/user');

const app = express();
const port = 8000;

// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// cookie Session
app.use(cookieSession({keys: ['mysecretkey', 'yekttercesyek'] }));
// passport
app.use(passport.initialize());
app.use(passport.session());
// view engine
app.set('view engine','pug');

// passport set Strategy
passport.use(new FacebookStrategy({
  clientID: process.env.FB_CLIENT_ID,
  clientSecret: process.env.FB_CLIENT_SECRET,
  callbackURL: `${process.env.FB_CALLBACK_URL}/auth/facebook/callback`
}, (accessToken, refreshToken, profile, cb)  => {
      // store user in session and BD
      // db
      User.findOrCreate({uid: profile.id, provider: 'facebook'}, {
        name: profile.displayName,
        provider: 'facebook',
        accessToken: accessToken
      },(err,user) => {
        // execute cb
        cb(null,user);
      });
}
));
// passport store user session
passport.serializeUser((user,done) => {
  done(null,user);
});
passport.deserializeUser((user,done) => {
  done(null,user);
});

// start auth cycle with FB
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['publish_actions','user_friends']}))
app.get('/auth/facebook/callback', passport.authenticate('facebook', {redirectTo : '/'}), (req,res) => {
  console.log(req.session);
  res.redirect('/')
});


app.get('/', (req,res) => {
  if (typeof req.session.passport == "undefined" || !req.session.passport.user){
    res.render('index');
  } else {
    // logged page
    res.render('home')
  }
});

// wall post

// find friends

app.get('/auth/logout', (req,res) => {
  req.logout();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
