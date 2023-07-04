import axios from 'axios';
import errorAlert from './errorAlert';
import { Contact } from '../types/Contact';
import { User } from '../types/User';

const baseUrl = 'http://localhost:9999';

export const getAllContacts = async ({
  user,
  setAllContacts
}: {
  user: User;
  setAllContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}) => {
  try {
    const response = await axios.get<Contact[]>(`${baseUrl}/getall/${user.id}`);
    setAllContacts(response.data);
  } catch (error) {
    errorAlert('Error retrieving contacts');
  }
};

export const createContact = async (newContact: Contact) => {
  try {
    await axios.post<Contact>(`${baseUrl}/save`, newContact);
  } catch (error) {
    errorAlert('Error creating contact');
  }
};

export const deleteContact = async (ContactToDelete: Contact) => {
  try {
    await axios.post<Contact>(`${baseUrl}/delete`, {
      _id: ContactToDelete._id
    });
  } catch (error) {
    errorAlert('Error deleting contact');
  }
};
