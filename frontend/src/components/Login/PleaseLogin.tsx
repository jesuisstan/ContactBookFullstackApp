import { useEffect, useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import BarLoader from 'react-spinners/BarLoader';
import * as colors from '../../styles/bookColors';
import SignUpModal from './SignUpModal';
import Stack from '@mui/material/Stack';
import FormInput from '../ContactBook/FormInput';
import styles from '../../styles/ContactForm.module.css';
import errorAlert from '../../utils/errorAlert';
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import * as MUI from '../../styles/MUIstyles';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { User } from '../../types/User';
import { useNavigate } from 'react-router-dom';

const baseUrl = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

const PleaseLogin = ({
  setUser
}: {
  setUser: React.Dispatch<React.SetStateAction<User>>;
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [signUpOpen, setSignUpOpen] = useState(false);

  const [loadGit, setLoadGit] = useState(false);
  const [loadGoogle, setLoadGoogle] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/api/auth/signin`, values, {
        withCredentials: true
      });
      setUser(response.data);
      navigate('/contactbook');
    } catch (error) {
      errorAlert(`Error logging in: ${error}`);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return loading ? (
    <div
      style={{
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '21px',
        color: colors.BOOK_GREEN,
        justifyContent: 'center'
      }}
    >
      <p>loading...</p>
      <BarLoader
        color={colors.BOOK_GREEN}
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '21px'
      }}
    >
      <SignUpModal open={signUpOpen} setOpen={setSignUpOpen} />
      <ErrorOutlineIcon fontSize="large" sx={{ color: colors.BOOK_ORANGE }} />
      <h1>Please login to continue</h1>

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
          <form onSubmit={handleLogin} className={styles.formList}>
            <FormInput
              {...{
                id: 2,
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
                id: 3,
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
              Log In
            </LoadingButton>
            <LoadingButton
              type="submit"
              //loading={loadingSave}
              //startIcon={contact ? <SaveAsIcon /> : <SaveIcon />}
              variant="contained"
              color="inherit"
              sx={MUI.LoadButton}
              onClick={() => setSignUpOpen(true)}
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
              //google();
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
              //github();
            }}
          >
            Github
          </LoadingButton>
        </div>
      </Stack>
    </div>
  );
};

export default PleaseLogin;
