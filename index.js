const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require("./config/keys");
require("./models/User");
require('./services/passport')

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())


app.use(require("./routes/authRoutes"));

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running`);
});
