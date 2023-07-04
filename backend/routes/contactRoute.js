const { Router } = require("express");

const { getAllContacts, saveContact, deleteContact, updateContact } = require("../controllers/contactController");

const router = Router();

router.get("/getall/:userId", getAllContacts);

router.post("/save", saveContact);

router.post("/delete", deleteContact);

router.post("/update", updateContact);

module.exports = router;