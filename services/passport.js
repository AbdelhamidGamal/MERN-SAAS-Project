const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  console.log('passport serialize : ', user)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    console.log('passport deserialize user found : ', user)
    done(null, user);
  })
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        console.log("user already exist and his profile id is : ", profile.id);
      } else {
        const newUser = await new User({ googleId: profile.id });
        user = await newUser.save();
        console.log("User Created");
      }

      console.log('end of passport func ', user)

      done(null, user)
    }
  )
);
