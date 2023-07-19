import axios from 'axios';
import errorAlert from './errorAlert';
import { Contact } from '../types/Contact';
import { User } from '../types/User';

const baseUrl = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export const getUserData = (
  setUser: React.Dispatch<React.SetStateAction<User>>
) => {
  axios.get(`${baseUrl}/auth/getuser`).then(
    (response) => {
      setUser(response.data);
    },
    (error) => {
      errorAlert('Authentication failed! Try again.');
    }
  );
};

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
    await axios.delete<Contact>(`${baseUrl}/delete`, {
      data: { _id: ContactToDelete!._id }
    });
  } catch (error) {
    errorAlert('Error deleting contact');
  }
};

export const updateContact = async (newContact: Contact) => {
  try {
    await axios.post<Contact>(`${baseUrl}/update`, newContact);
  } catch (error) {
    errorAlert('Error updating contact');
  }
};

export const searchContactsByLastName = (
  contacts: Contact[],
  lastName: string,
): Contact[] => {
  const lowerCaseLastName = lastName.toLowerCase();

  let result: Contact[] = contacts.filter(
    (contact) => contact.lastName.toLocaleLowerCase() === lowerCaseLastName
  );

  if (!result.length) {
    errorAlert('No matching contacts');
  }
  return result;
};
