module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res
      .status(403)
      .send({ error: 'You Must Have Credits To Create a Survey!' });
  }
  next();
};
