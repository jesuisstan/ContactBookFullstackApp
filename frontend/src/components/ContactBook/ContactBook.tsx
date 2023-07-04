import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/bookColors';
import axios from 'axios';
import { User } from '../../types/User';
import { Contact } from '../../types/Contact';
import errorAlert from '../../utils/errorAlert';
import * as utils from '../../utils/contactsHandlers';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactCard from './ContactCard';

const baseUrl = 'http://localhost:9999';

const ContactBook = ({ user }: { user: User }) => {
  const [loadingSave, setLoadingSave] = useState(false);
  const [renderingTrigger, setRenderingTrigger] = useState(0);

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

  const handleSaveClick = async () => {
    setLoadingSave(true);
    await utils.createContact(newCon);
    setLoadingSave(false);
    setSaveTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    if (user.provider) utils.getAllContacts({ user, setAllContacts });
  }, [user, saveTrigger, renderingTrigger]);

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
        loading={loadingSave}
        //startIcon={<GoogleIcon />}
        variant="contained"
        color="inherit"
        sx={MUI.LoadButton}
        onClick={handleSaveClick}
      >
        New
      </LoadingButton>
      {allContacts.map((contact) => (
        <div key={contact._id}>
          <ContactCard
            contact={contact}
            setRenderingTrigger={setRenderingTrigger}
          />
        </div>
      ))}
    </div>
  );
};

export default ContactBook;
