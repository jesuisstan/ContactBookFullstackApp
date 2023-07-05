import { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import BirthdayPicker from './BirthdayPicker';
import NameModifier from './NameModifier';
import LoadingButton from '@mui/lab/LoadingButton';
import { User } from '../../types/User';
import * as utils from '../../utils/contactsHandlers';
import * as colors from '../../styles/bookColors';
import * as MUI from '../../styles/MUIstyles';
import { Contact } from '../../types/Contact';
import EmailModifier from './EmailModifier';

const ContactForm = ({
  user,
  open,
  setOpen,
  setRenderingTrigger,
  contact
}: {
  user: User;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRenderingTrigger: React.Dispatch<React.SetStateAction<number>>;
  contact?: Contact;
}) => {
  const [firstName, setFirstName] = useState('' || contact?.firstName);
  const [lastName, setLastName] = useState('' || contact?.lastName);
  const [email, setEmail] = useState('' || contact?.email);
  const [comment, setComment] = useState('' || contact?.comment);
  const [birthday, setBirthday] = useState('' || contact?.birthday);

  const [loadingSave, setLoadingSave] = useState(false);

  const setDefault = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setComment('');
    setBirthday('');
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    setLoadingSave(true);

    const newContact: Contact = {
      userID: user.id,
      firstName: firstName ?? '',
      lastName: lastName ?? '',
      birthday: birthday ?? '',
      email: email ?? '',
      comment: comment ?? '',
      _id: contact?._id
    };

    if (contact) {
      await utils.updateContact(newContact);
    } else {
      await utils.createContact(newContact);
      setDefault();
    }
    setLoadingSave(false);
    setRenderingTrigger((prev) => prev + 1);
  };

  return (
    <Drawer
      PaperProps={{
        style: {
          backgroundColor: colors.BOOK_WHITE
        }
      }}
      anchor="right"
      open={open}
      onClose={handleDrawerToggle}
    >
      <form style={{ marginTop: '10px' }} onSubmit={handleSubmit}>
        <div style={{ maxWidth: '300px', textAlign: 'center' }}>
          <h1>Modifying the contact GG</h1>
          <NameModifier
            name={firstName ?? ''}
            setName={setFirstName as Dispatch<SetStateAction<string>>}
            nameType="First name"
          />
          <NameModifier
            name={lastName ?? ''}
            setName={setLastName as Dispatch<SetStateAction<string>>}
            nameType="Last name"
          />

          <EmailModifier
            name={email ?? ''}
            setName={setEmail as Dispatch<SetStateAction<string>>}
            nameType="Email"
          />

          <NameModifier
            name={comment ?? ''}
            setName={setComment as Dispatch<SetStateAction<string>>}
            nameType="Comment"
          />

          <BirthdayPicker />

          <LoadingButton
            type="submit"
            loading={loadingSave}
            //startIcon={<GoogleIcon />}
            variant="contained"
            color="inherit"
            sx={MUI.LoadButton}
          >
            {contact ? 'Modify' : 'Create'}
          </LoadingButton>
        </div>
      </form>
    </Drawer>
  );
};

export default ContactForm;
