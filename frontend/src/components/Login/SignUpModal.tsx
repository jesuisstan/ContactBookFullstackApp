import { useState, SetStateAction, Dispatch } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/bookColors';
import styles from '../../styles/ContactForm.module.css';
import FormInput from '../ContactBook/FormInput';
import { LoginFormValues } from '../../types/LoginFormValues';
import axios from 'axios';
import errorAlert from '../../utils/errorAlert';
import { useNavigate } from 'react-router-dom';
import saveAlert from '../../utils/saveAlert';

const baseUrl = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

const SignUpModal = ({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const [values, setValues] = useState<LoginFormValues>({
    nickname: '',
    email: '',
    password: ''
  });

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoad(true);
    try {
      await axios.post(`${baseUrl}/api/auth/signup`, values, {
        withCredentials: true
      });
      setOpen(false);
      setLoad(false);
      saveAlert();
      navigate('/login');
    } catch (error) {
      setLoad(false);
      setOpen(false);
      errorAlert('Error while creating new account');
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const trimmedValue = value.replace(/\s/g, '');
    setValues({ ...values, [name]: trimmedValue });
  };

  return (
    <Modal
      sx={{ color: colors.BOOK_BLACK }}
      open={open}
      onClose={(event, reason) => {
        if (event && reason === 'closeClick') {
          setLoad(false);
          setOpen(false);
        }
      }}
    >
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        sx={MUI.modalDialog}
      >
        <ModalClose sx={MUI.modalClose} />
        <Typography sx={MUI.modalHeader}>Create new account</Typography>
        <Stack spacing={2}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '21px',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <form onSubmit={handleSignUp} className={styles.formList}>
              <FormInput
                {...{
                  id: 1,
                  name: 'nickname',
                  type: 'text',
                  placeholder: 'Nickname',
                  errorMessage: 'Max 20 characters. Allowed: A-Z a-z 0-9',
                  label: 'Nickname',
                  pattern: '^[A-Za-z0-9]{1,20}$',
                  required: true
                }}
                value={values.nickname}
                onChange={onChange}
              />
              <FormInput
                {...{
                  id: 2,
                  name: 'email',
                  type: 'email',
                  placeholder: 'Email',
                  errorMessage: 'Should be a valid email with max length 42',
                  label: 'Email',
                  pattern: '^(?=.{1,42}$)\\S+@\\S+\\.\\S+$',
                  required: true
                }}
                value={values.email}
                onChange={onChange}
              />
              <FormInput
                {...{
                  id: 3,
                  name: 'password',
                  type: 'password',
                  placeholder: 'Password',
                  errorMessage:
                    '3-20 chars, 1 letter, 1 number, 1 special symbol',
                  label: 'Password',
                  pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,20}$`,
                  required: true
                }}
                value={values.password}
                onChange={onChange}
              />
              <LoadingButton
                type="submit"
                loading={load}
                variant="contained"
                color="inherit"
                sx={MUI.LoadButton}
              >
                Sign Up
              </LoadingButton>
            </form>
          </div>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default SignUpModal;
