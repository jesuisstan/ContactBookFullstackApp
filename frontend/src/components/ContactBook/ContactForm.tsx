import { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import BirthdayPicker from './BirthdayPicker';
import NameModifier from './NameModifier';
import LoadingButton from '@mui/lab/LoadingButton';
import { User } from '../../types/User';
import * as utils from '../../utils/contactsHandlers';
import * as colors from '../../styles/bookColors';
import * as MUI from '../../styles/MUIstyles';

const ContactForm = ({
  user,
  open,
  setOpen,
  setRenderingTrigger
}: {
  user: User;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setRenderingTrigger: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [birthday, setBirthday] = useState('');

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

    const newContact = {
      userID: user.id,
      firstName: firstName,
      lastName: lastName,
      birthday: birthday,
      email: email,
      comment: comment
    };

    await utils.createContact(newContact);
    setLoadingSave(false);
    setDefault();
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
            name={firstName}
            setName={setFirstName}
            nameType="First name"
          />
          <NameModifier
            name={lastName}
            setName={setLastName}
            nameType="Last name"
          />

          <NameModifier name={email} setName={setEmail} nameType="Email" />

          <NameModifier
            name={comment}
            setName={setComment}
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
            Save
          </LoadingButton>
        </div>
      </form>
    </Drawer>
  );
};

export default ContactForm;
