const { Router } = require("express");

const { getContact, saveContact, deleteContact, updateContact } = require("../controllers/contactController");

const router = Router();

router.get("/getall", getContact);

router.post("/save", saveContact);

router.post("/delete", deleteContact);

router.post("/update", updateContact);

module.exports = router;