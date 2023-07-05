import { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { User } from '../../types/User';
import * as utils from '../../utils/contactsHandlers';
import * as colors from '../../styles/bookColors';
import * as MUI from '../../styles/MUIstyles';
import { Contact } from '../../types/Contact';
import FormInput from './FormInput';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  birthday: string;
  comment: string;
};

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
  const [loadingSave, setLoadingSave] = useState(false);
  const [values, setValues] = useState<FormValues>({
    firstName: contact?.firstName ?? '',
    lastName: contact?.lastName ?? '',
    email: contact?.email ?? '',
    birthday: contact?.birthday ?? '',
    comment: contact?.comment ?? ''
  });

  const inputs = [
    {
      id: 1,
      name: 'firstName',
      type: 'text',
      placeholder: 'First name',
      errorMessage: 'Max 20 characters. Allowed: A-Z _ - a-z',
      label: 'First name',
      pattern: '^[A-Za-z0-9]{1,20}$',
      required: true
    },
    {
      id: 2,
      name: 'lastName',
      type: 'text',
      placeholder: 'Last name',
      errorMessage: 'Max 20 characters. Allowed: A-Z _ - a-z',
      label: 'Last name',
      pattern: '^[A-Za-z0-9]{1,20}$',
      required: true
    },
    {
      id: 3,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'It should be a valid email address!',
      label: 'Email',
      required: true
    },
    {
      id: 4,
      name: 'birthday',
      type: 'date',
      placeholder: 'Birthday',
      label: 'Birthday'
    },
    {
      id: 5,
      name: 'comment',
      type: 'text',
      placeholder: 'Comment',
      label: 'Comment'
    }
  ];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    setLoadingSave(true);

    const newContact: Contact = {
      ...values,
      userID: user.id,
      _id: contact?._id
    };

    if (contact) {
      await utils.updateContact(newContact);
    } else {
      await utils.createContact(newContact);
      setTimeout(
        () =>
          setValues({
            firstName: '',
            lastName: '',
            email: '',
            birthday: '',
            comment: ''
          }),
        3000
      );
    }
    setLoadingSave(false);
    setRenderingTrigger((prev) => prev + 1);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [event.target.name]: event.target.value });
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
      <form onSubmit={handleSubmit}>
        <h1>Contact</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name as keyof FormValues]}
            onChange={onChange}
          />
        ))}
        <LoadingButton
          type="submit"
          loading={loadingSave}
          //startIcon={<GoogleIcon />}
          variant="contained"
          color="inherit"
          sx={MUI.LoadButton}
        >
          {contact ? 'Change' : 'Create'}
        </LoadingButton>
      </form>
    </Drawer>
  );
};

export default ContactForm;
