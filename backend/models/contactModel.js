const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  birthday: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Contact', contactSchema);
