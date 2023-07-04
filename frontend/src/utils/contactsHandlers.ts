import axios from "axios";
import errorAlert from "./errorAlert";
import { Contact } from "../types/Contact";

const baseUrl = 'http://localhost:9999';

export  const createContact = async (newContact: Contact) => {
	try {
		await axios.post<Contact>(`${baseUrl}/save`, newContact);
	} catch (error) {
		errorAlert('Error creating contact');
	}
};