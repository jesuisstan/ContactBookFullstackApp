import express from "express";
import { getAllContacts, saveContact, deleteContact, updateContact } from "../controllers/contactController.js";

const router = express.Router();

router.get("/getall/:userId", getAllContacts);

router.post("/save", saveContact);

router.delete("/delete", deleteContact);

router.post("/update", updateContact);

export default router;
