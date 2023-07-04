import { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';
import { User } from '../../types/User';
import { Contact } from '../../types/Contact';
import errorAlert from '../../utils/errorAlert';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactCard from './ContactCard';
import * as utils from '../../utils/contactsHandlers';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/bookColors';
import CardDrawer from './CardDrawer';

const baseUrl = 'http://localhost:9999';

const ContactBook = ({ user }: { user: User }) => {
  const [loadingSave, setLoadingSave] = useState(false);
  const [renderingTrigger, setRenderingTrigger] = useState(0);
  const [cardDrawerOpen, setCardDrawerOpen] = useState(false);

  const [allContacts, setAllContacts] = useState<Contact[]>([]);

  const handleSaveClick = async () => {
    //setLoadingSave(true);
    //await utils.createContact(newCon);
    //setLoadingSave(false);
    //setRenderingTrigger((prev) => prev + 1);
    setCardDrawerOpen(true);
  };

  useEffect(() => {
    if (user.provider) utils.getAllContacts({ user, setAllContacts });
  }, [user, renderingTrigger]);

  return (
    <>
      <CardDrawer
        open={cardDrawerOpen}
        setOpen={setCardDrawerOpen}
        user={user}
        setRenderingTrigger={setRenderingTrigger}
      />
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
          Add new
        </LoadingButton>
        {allContacts.map((contact) => (
          <div key={contact!._id}>
            <ContactCard
              contact={contact}
              setRenderingTrigger={setRenderingTrigger}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ContactBook;
