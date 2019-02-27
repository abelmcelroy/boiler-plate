'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const compression = require('compression')
const path = require('path');
const { db, Users } = require('../db/index')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({ db })
const passport = require('passport')

const PORT = process.env.PORT || 4000;

// passport registration
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser((user, done) => done(null, user.id))
passport.deserializeUser((id, done) =>
  Users.findById(id)
    .then(user => done(null, user))
    .catch(done))

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// compression middleware
app.use(compression())

// session middleware with passport
app.use(session({
  secret: process.env.SESSION_SECRET || 'nothing',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))

app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
}); // Send index.html for any other requests


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log('***************************')
      console.log(`Listening on Port: ${PORT}`);
    })
  })
