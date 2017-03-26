const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const models = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user.username)
})

passport.deserializeUser((username, done) => {
  models.findUser(username, done)
})

passport.use(new LocalStrategy({ usernameField: 'username' }, (username, password, done) => {
  models.findUser(username, (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false) }
    if (password !== user.password) { return done(null, false) }
    return done(null, user)
  })
}))

const login = ({ username, password, req }) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (!user) { reject('Invalid credentials') }

      req.login(user, () => resolve(user))
    })({ body: { username, password } })
  })
}

module.exports = { login }
