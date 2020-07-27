const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const keys = require('../config/keys');

const Survey = mongoose.model('surveys');

// mailGun Config
const mailgun = require('mailgun-js');
const DOMAIN = 'sandbox9a5014b2780f4e26bd4148b7d4cd49e4.mailgun.org';

router.post('/api/surveys/webhook', (req, res) => {
  const recipient = req.body['event-data'].recipient;
  const link = req.body['event-data']['recipient-domain'];
  console.log(recipient, link);
});

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, recipients } = req.body;

  // Create Survey
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: recipients.split(',').map((email) => ({ email: email.trim() })),
    _user: req.user,
    dataSent: Date.now(),
  });

  // create the message and send it

  const mg = mailgun({
    apiKey: '6c2a2115b4d15de7134c37d81989d248-a65173b1-570bf04d',
    domain: DOMAIN,
  });

  const data = {
    from: 'Emaily <no-replay@emaily.com>',
    to: recipients,
    subject: subject,
    html: `
      <div style='text-align:center'>
        <h3> I'd Like Your Input </h3>
        <p> Please Answer The Following Question</p>
        <p> ${body} </p>
        <div>
        <a href="${keys.redirectDomain}surveys/thanks/${survey.id}/yes"> Yes </a> 
        </div>
        <div>
        <a href="${keys.redirectDomain}surveys/thanks/${survey.id}/no"> No </a>
        </div>
      </div>
    `,
  };

  //Deduct user credits by one
  req.user.credits--;

  // Send Email and Save Survey and User
  try {
    const user = await req.user.save();
    await survey.save();
    mg.messages().send(data, (error, body) => {
      console.log(body);
    });
  } catch (error) {
    res.status(422).send(error);
  }

  // Send response
  res.send(req.user);
});

module.exports = router;
