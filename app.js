const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session');
const app = express();
const port = 8000

app.get('/', (req,res) => {
  res.end('Hello world');
});

app.listen(port)
