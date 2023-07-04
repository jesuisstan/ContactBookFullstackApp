import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/bookColors';
import axios from 'axios';
import { User } from '../../types/User';
import { Contact } from '../../types/Contact';
import errorAlert from '../../utils/errorAlert';
import * as utils from '../../utils/contactsHandlers';

const baseUrl = 'http://localhost:9999';

const ContactBook = ({ user }: { user: User }) => {
  const [loading, setLoading] = useState(false);
  const [saveTrigger, setSaveTrigger] = useState(0);
  const [allContacts, setAllContacts] = useState<Contact[]>([]);

  const newCon = {
    userID: user.id,
    firstName: 'New',
    lastName: 'NEWWWWW',
    birthday: '01.08.2187',
    email: 'wake@gmail.com',
    comment: 'normal'
  };

  const handleNewClick = async () => {
    setLoading(true);
    await utils.createContact(newCon);
    setLoading(false);
    setSaveTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Contact[]>(
          `${baseUrl}/getall/${user.id}`
        );
        setAllContacts(response.data);
      } catch (error) {
        errorAlert('Error retrieving contacts');
      }
    };

    if (user.provider) fetchData();
  }, [user, saveTrigger]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '21px'
      }}
    >
      <LoadingButton
        loading={loading}
        //startIcon={<GoogleIcon />}
        variant="contained"
        color="inherit"
        sx={MUI.LoadButton}
        onClick={handleNewClick}
      >
        New
      </LoadingButton>
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
