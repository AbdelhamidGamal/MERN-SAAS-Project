const mongoose = require('mongoose');
const RecipientSchema = require('./Recipient');
const { Schema } = mongoose;

const surveySchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  subject: String,
  body: String,
  recipients: [RecipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  dataSent: Date,
  lastResponse: Date,
});

mongoose.model('surveys', surveySchema);
