# MERN-SAAS-Project

### try it : https://lit-island-27850.herokuapp.com/

- Note That you won't be able to send emails becouse the MailGun domain assosiates with the app is not verified and only restricted to sending emails to only verified emails, to test the whole app functionality feel free to install the app and replace the api keys with your own.

#### A web app built using the MERN stack, Where users can :

- Signup using Google Oauth
- Charge account with credits (using stripe)
- Create surveys and send it to their clients
- collect clients feedback using webhooks

#### this app is built using mainly:

- Nodejs, ExpressJs, Mongoose on the Back-end
- Reactjs, Reduxjs on the Front-end
- Mongodb

### Using the app :

#### In Development Mode :

You have to provide your own dev.js file with the approprite keys in /confing
example :

```
module.exports = {
  GOOGLE_CLIENT_ID:'xxx',
  GOOGLE_CLIENT_SECRET: 'xxx',
  mongoURI:'xxx',
  cookieKey: 'xxx',
  stripePublishablekey:'xxx',
  stripeSecretKey:'xxx',
  redirectDomain: 'http://localhost:3000/',
  mailGunApiKey: 'xxx',
  MailGunDomain: 'xxx',
};

```

#### In production Mode make sure to set the same keys as envirment varibles, becouse the app will be searching for them, (keys/prod.js):s

```
module.exports = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  mongoURI: process.env.mongoURI,
  cookieKey: process.env.cookieKey,
  stripePublishablekey: process.env.stripePublishablekey,
  stripeSecretKey: process.env.stripeSecretKey,
  redirectDomain: process.env.redirectDomain,
  mailGunApiKey: process.env.mailGunApiKey,
  MailGunDomain: process.env.MailGunDomain,
};
```
