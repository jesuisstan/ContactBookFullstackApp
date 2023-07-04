const contactModel = require('../models/contactModel');

module.exports.getContact = async (req, res) => {
  const contact = await contactModel.find();
  res.send(contact);
};

module.exports.saveContact = (req, res) => {
  console.log(req.body);
  const { UserID, FirstName, LastName, Email, Birthday, Comment } = req.body;

  contactModel.create({ UserID, FirstName, LastName, Email, Birthday, Comment })
    .then((data) => {
      console.log('Added Successfully...');
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
};

module.exports.deleteContact = (req, res) => {
  const { _id } = req.body;

  console.log('id ---> ', _id);

  contactModel.findByIdAndDelete(_id)
    .then(() => res.set(201).send('Deleted Successfully...'))
    .catch((err) => console.log(err));
};

module.exports.updateContact = (req, res) => {
  const { _id, text } = req.body;

  contactModel.findByIdAndUpdate(_id, { text })
    .then(() => res.set(201).send('Updated Successfully...'))
    .catch((err) => console.log(err));
};
