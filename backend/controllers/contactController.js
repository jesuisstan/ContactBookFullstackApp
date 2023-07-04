const contactModel = require('../models/contactModel');

//module.exports.getAllContacts = async (req, res) => {
//  const contacts = await contactModel.find();
//  res.send(contacts);
//};

module.exports.getAllContacts = async (req, res) => {
  const { userId } = req.params; // Accessing the userId from req.params

  if (userId) {
    try {
      const contacts = await contactModel.find({ userID: userId });
      res.send(contacts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.status(400).send('User ID is required.'); // Send a 400 Bad Request if userId is not provided
  }
};

module.exports.saveContact = (req, res) => {
  const { userID, firstName, lastName, email, birthday, comment } = req.body;

  contactModel.create({ userID, firstName, lastName, email, birthday, comment })
    .then((data) => {
      console.log('Added Successfully...');
      res.send(data);
    })
    .catch((err) => console.log(err));
};

module.exports.deleteContact = (req, res) => {
  const { _id } = req.body;

  console.log('id ---> ', _id);

  contactModel.findByIdAndDelete(_id)
    .then(() => res.status(201).send('Deleted Successfully...'))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Error deleting contact...');
    });
};

module.exports.updateContact = (req, res) => {
  const { _id, text } = req.body;

  contactModel.findByIdAndUpdate(_id, { text })
    .then(() => res.set(201).send('Updated Successfully...'))
    .catch((err) => console.log(err));
};
