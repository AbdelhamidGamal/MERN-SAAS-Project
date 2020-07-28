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

router.post('/api/surveys/webhook', async (req, res) => {
  const recipientEmail = req.body['event-data'].recipient;
  const url = req.body['event-data'].url;
  const urlParts = url.split('/');
  const surveyId = urlParts[5];
  const vote = urlParts[6];

  console.log('surveyRoutes.js line 21 --- survey id :', surveyId);

  // find survey
  survey = await Survey.findById(surveyId);

  // find recipient
  recipient = survey.recipients.find((r) => r.email === recipientEmail);

  // if recipient already replied terminate session
  if (recipient.responded) {
    return res.status(405).send('You Already Voted Before!');
  }

  // mark recipient responded to true

  recipient.responded = true;

  // increment yes or no count
  if (vote === 'yes') {
    survey.yes++;
  } else {
    survey.no++;
  }

  // save survey
  await survey.save();

  // respond to request
  res.status(200).send('voted');
});

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
  const { title, subject, body, emails } = req.body;

  // Create Survey
  const survey = new Survey({
    title,
    subject,
    body,
    recipients: emails.split(',').map((email) => ({ email: email.trim() })),
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
    to: emails,
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

router.get('/api/surveys', requireLogin, async (req, res) => {
  const surveys = await Survey.find({ _user: req.user });
  res.send(surveys);
});

module.exports = router;
