import mongoose from "mongoose";

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
    required: false
  },
  comment: {
    type: String,
    required: false
  }
});

export default mongoose.model("Contact", contactSchema);

