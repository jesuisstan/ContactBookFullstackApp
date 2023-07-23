import { useState, SetStateAction, Dispatch } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/bookColors';
import styles from '../../styles/ContactForm.module.css';
import FormInput from '../ContactBook/FormInput';
import { LoginFormValues } from '../../types/LoginFormValues';
import axios from 'axios';
import errorAlert from '../../utils/errorAlert';

const baseUrl = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

const SignUpModal = ({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loadGit, setLoadGit] = useState(false);
  const [loadGoogle, setLoadGoogle] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [values, setValues] = useState<LoginFormValues>({
    nickname: '',
    email: '',
    password: ''
  });

  const google = () => {
    window.location.href = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/auth/google`;
  };

  const github = () => {
    window.location.href = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/auth/github`;
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/signup`, values, {
        withCredentials: true
      });
      console.log(response.data);
    } catch (error) {
      errorAlert('Error creating user');
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Modal
      sx={{ color: colors.BOOK_BLACK }}
      open={open}
      onClose={(event, reason) => {
        if (event && reason === 'closeClick') {
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
                  name: 'nickname', // Add this line to set the name prop to "nickname"
                  type: 'text',
                  placeholder: 'Nickname',
                  errorMessage: 'Max 20 characters. Allowed: A-Z a-z',
                  label: '* Nickname',
                  pattern: '^[A-Za-z]{1,20}$',
                  required: true
                }}
                value={values.nickname}
                onChange={onChange}
              />
              <FormInput
                {...{
                  id: 1,
                  name: 'email',
                  type: 'email',
                  placeholder: 'Email',
                  errorMessage: 'Should be a valid email with max length 42',
                  label: '* Email',
                  pattern: '^(?=.{1,42}$)\\S+@\\S+\\.\\S+$',
                  required: true
                }}
                value={values.email}
                onChange={onChange}
              />
              <FormInput
                {...{
                  id: 2,
                  name: 'password',
                  type: 'password',
                  placeholder: 'Password',
                  errorMessage:
                    'Password should be 3-20 characters and include at least 1 letter, 1 number and 1 special character!',
                  label: 'Password',
                  pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{3,20}$`,
                  required: true
                }}
                value={values.password}
                onChange={onChange}
              />
              <LoadingButton
                type="submit"
                //loading={loadingSave}
                //startIcon={contact ? <SaveAsIcon /> : <SaveIcon />}
                variant="contained"
                color="inherit"
                sx={MUI.LoadButton}
              >
                Sign Up
              </LoadingButton>
            </form>

            <LoadingButton
              disabled={disabled}
              loading={loadGoogle}
              startIcon={<GoogleIcon />}
              variant="contained"
              color="inherit"
              sx={{
                ...MUI.LoadButton,
                ':hover': {
                  color: colors.BOOK_WHITE,
                  bgcolor: '#df4930'
                }
              }}
              onClick={() => {
                setLoadGoogle(true);
                setDisabled(true);
                google();
              }}
            >
              Google
            </LoadingButton>
            <LoadingButton
              disabled={disabled}
              loading={loadGit}
              startIcon={<GitHubIcon />}
              variant="contained"
              color="inherit"
              sx={{
                ...MUI.LoadButton,
                ':hover': {
                  color: colors.BOOK_WHITE,
                  bgcolor: '#24292f'
                }
              }}
              onClick={() => {
                setLoadGit(true);
                setDisabled(true);
                github();
              }}
            >
              Github
            </LoadingButton>
          </div>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default SignUpModal;
