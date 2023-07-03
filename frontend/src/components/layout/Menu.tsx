import { NavLink } from 'react-router-dom';
import User from '../../types/User';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import LoginModal from '../Login/LoginModal';
import styles from '../../styles/Menu.module.css';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/bookColors';

const Menu = ({ user }: { user: User }) => {
  const [loginOpen, setLoginOpen] = useState(false);

  const authenticate = () => {
    if (user.provider) {
      window.location.href = 'http://localhost:9999/auth/logout';
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <div>
      <LoginModal open={loginOpen} setOpen={setLoginOpen} />
      <nav className={styles.navbar}>
        <div className={styles.left}>
          <NavLink to=".">Home</NavLink>
          <NavLink to="contactbook">Contact Book</NavLink>
        </div>

        <div className={styles.right}>
          <div className={styles.userData}>
            <Avatar alt="" src={user.avatar} />
          </div>
          <div>
            <LoadingButton
              startIcon={user.provider ? <LogoutIcon /> : <LoginIcon />}
              variant="contained"
              color="inherit"
              sx={MUI.LoadButton}
              onClick={() => {
                authenticate();
              }}
            >
              {user.provider ? 'Logout' : 'Login'}
            </LoadingButton>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Menu;
