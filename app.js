const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const FacebookStrategy = require('passport-strategy').Strategy;
const graph = require('fbgraph');

const app = express();
const port = 8000

// bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// cookie Session
app.use(cookieSession({keys: ['mysecretkey', 'yekttercesyek'] }))
// passport
app.use(passport.initialize());
app.use(passport.session())
// view engine
app.set('view engine','pug')

app.get('/', (req,res) => {
  res.render('index');
});

app.listen(port)
