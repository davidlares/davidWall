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
app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['publish_to_group','manage_pages','publish_pages','status_update','user_friends']}))
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
app.post('/goal', (req,res) => {
   var goal = req.body.goal;
   graph.setAccessToken(req.session.passport.user.accessToken);
   graph.post('/feed', {message: goal}, (err, graphResponse) => {
     console.log(graphResponse);
     res.redirect('/');
   });
});

// find friends
app.get('/friends', (req,res) => {
  graph.setAccessToken(req.session.passport.user.accessToken);
  graph.get('me/friends', (err, graphResponse) => {
    // res.json(graphResponse);
    // Extract ids from array
    var ids = graphResponse.data.map((el) => {
      return el.id;
    });
    // search from the user collection, uid = the obtained
    User.find({
      'uid': {$in: ids}
    }, (err,users) => {
      res.render('friends',{users: users});
    });
    // show users
  });
});

app.get('/auth/logout', (req,res) => {
  req.logout();
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
