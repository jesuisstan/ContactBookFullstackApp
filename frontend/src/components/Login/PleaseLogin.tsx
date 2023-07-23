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
  const [loadingLogin, setLoadingLogin] = useState(false);
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
    setLoadingLogin(true);
    try {
      const response = await axios.post(`${baseUrl}/api/auth/signin`, values, {
        withCredentials: true
      });
      setUser(response.data);
      navigate('/contactbook');
    } catch (error) {
      setLoadingLogin(false);
      errorAlert(`Error logging in: ${error}`);
    }
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const trimmedValue = value.replace(/\s/g, '');
    setValues({ ...values, [name]: trimmedValue });
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
        textAlign: 'left',
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
                id: 1,
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
                id: 2,
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
              loading={loadingLogin}
              variant="contained"
              color="inherit"
              sx={MUI.LoadButton}
            >
              Log In
            </LoadingButton>
            <LoadingButton
              type="submit"
              variant="contained"
              color="inherit"
              sx={MUI.LoadButton}
              onClick={() => setSignUpOpen(true)}
            >
              Sign Up
            </LoadingButton>
          </form>
        </div>
      </Stack>
    </div>
  );
};

export default PleaseLogin;
