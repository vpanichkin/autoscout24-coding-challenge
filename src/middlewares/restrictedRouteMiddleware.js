const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const config = require('../config.js')(process.env.NODE_ENV);

passport.use(new BasicStrategy(
  function (userId, password, done) {
    done(null, config.users[userId] === password);
  }
));

module.exports = passport.authenticate('basic', { session: false })
