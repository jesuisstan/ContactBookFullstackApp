import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/bookColors';
import axios from 'axios';
import User from '../../types/User';

const baseUrl = 'http://localhost:9999';

interface Contact {
  // Define the type of your contact object properties
  userID: string;
  _id: number;
  firstName: string;
  lastName: string;
  birthday: string;
  email: string;
  comment?: string;
  // Add any other properties as needed
}

const ContactBook = ({ user }: { user: User }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`${baseUrl}/getall/${user.id}`);
        const response = await axios.get<Contact[]>(
          `${baseUrl}/getall/${user.id}`
        );
        setAllContacts(response.data);
      } catch (error) {
        console.error('Error retrieving contacts:', error);
      }
    };

    if (user.provider) fetchData();
  }, [user]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '21px'
      }}
    >
      {allContacts.map((contact) => (
        <div key={contact._id}>
          <h1>{contact.lastName}</h1>
          <p>{contact.birthday}</p>
          <p>{contact.email}</p>
        </div>
      ))}
    </div>
  );
};

export default ContactBook;
