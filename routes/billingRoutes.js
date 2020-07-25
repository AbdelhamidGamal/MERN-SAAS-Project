const keys = require('../config/keys');
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(keys.stripeSecretKey);
const mongoose = require('mongoose');
const User = mongoose.model('users');
const requireLogin = require('../middlewares/requireLogin');

router.post('/api/stripe', requireLogin, async (req, res) => {
  const charge = await stripe.charges.create({
    amount: 500,
    currency: 'usd',
    source: req.body.id,
    description: 'charge for emaily',
  });

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      credits: req.user.credits + 5,
    },
    {
      useFindAndModify: false,
      new: true,
    }
  );

  res.send(user);
});

module.exports = router;
