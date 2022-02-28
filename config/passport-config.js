/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require("../models"); // models path depend on your structure
const User = db.users;

const localPassport = require('passport-local');

const LocalStrategy = localPassport.Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async function (email, password, done) {
    console.log(email, password, 'local login');
    // User.findOne({ email }, async function (err, user) {
    //   console.log(user, 'user login');
    //   if (err) {
    //     return done(err);
    //   }
    //   if (!user) {
    //     return done(null, false);
    //   }
    //   const validPassword = await bcrypt.compare(password, user.password);
    //   if (!validPassword) {
    //     return done(null, false);
    //   }
    //   return done(null, user);
    // });

    User.findOne({
      where: {
        email
      }
    })
      .then(async(user) => {
        if (!user) {
          return done(null, false);
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          return done(null, false);
        }
        return done(null, user);
      })
      .catch(err => {
        return done(err);
      })

  }),
);
