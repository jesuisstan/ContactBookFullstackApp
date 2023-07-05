import { SetStateAction, Dispatch, useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { User } from '../../types/User';
import { Contact } from '../../types/Contact';
import FormInput from './FormInput';
import SaveIcon from '@mui/icons-material/Save';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import * as utils from '../../utils/contactsHandlers';
import * as colors from '../../styles/bookColors';
import * as MUI from '../../styles/MUIstyles';

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
      errorMessage: 'Max 20 characters. Allowed: A-Z a-z',
      label: '* First name',
      pattern: '^[A-Za-z]{1,20}$',
      required: true
    },
    {
      id: 2,
      name: 'lastName',
      type: 'text',
      placeholder: 'Last name',
      errorMessage: 'Max 20 characters. Allowed: A-Z a-z',
      label: '* Last name',
      pattern: '^[A-Za-z]{1,20}$',
      required: true
    },
    {
      id: 3,
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      errorMessage: 'Should be a valid email with max length 42',
      label: '* Email',
      pattern: '^.{5,42}$',
      required: true
    },
    {
      id: 4,
      name: 'birthday',
      type: 'date',
      placeholder: 'Birthday',
      label: 'Birthday',
      max: new Date().toISOString().split('T')[0]
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
      setValues({
        firstName: '',
        lastName: '',
        email: '',
        birthday: '',
        comment: ''
      });
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '21px',
            margin: '21px 21px 0'
          }}
        >
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
            startIcon={contact ? <SaveAsIcon /> : <SaveIcon />}
            variant="contained"
            color="inherit"
            sx={MUI.LoadButton}
          >
            {contact ? 'Modify current' : 'Create new'}
          </LoadingButton>
        </div>
      </form>
    </Drawer>
  );
};

export default ContactForm;
