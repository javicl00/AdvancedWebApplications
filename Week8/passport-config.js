const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { users } = require('./model/users.json');

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = (username, password, done) => {
    const user = getUserByUsername(username)
    if (user == null) {
      return done(null, false, { message: 'No user with that username' })
    }

    try {
      if (bcrypt.compareSync(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new Strategy(authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize
