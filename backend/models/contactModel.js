const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  UserID: {
    type: String,
    required: true
  },
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Birthday: {
    type: String,
    required: true
  },
  Comment: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Contact', contactSchema);
