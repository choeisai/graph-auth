const express = require('express')
const expressGraphQL = require('express-graphql')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const passportConfig = require('./services/auth')
const RedisStore = require('connect-redis')(session)
const schema = require('./schema/schema')

// Create a new Express application
const app = express()

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'this is secret',
  store: new RedisStore({
    url: 'redis://localhost:6379',
    autoReconnect: true
  }),
  cookie: {
    maxAge: 6000
  }
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

module.exports = app

