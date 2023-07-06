import { NavLink } from 'react-router-dom';
import { User } from '../../types/User';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuDrawer from './MenuDrawer';
import LoginModal from '../Login/LoginModal';
import styles from '../../styles/Menu.module.css';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/bookColors';

const Menu = ({ user }: { user: User }) => {
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const isUltraSmallScreen = useMediaQuery('(max-width:350px)');
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const authenticate = () => {
    if (user.provider) {
      window.location.href = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/auth/logout`;
    } else {
      setLoginOpen(true);
    }
  };

  return (
    <div>
      <LoginModal open={loginOpen} setOpen={setLoginOpen} />
      <nav className={styles.navbar}>
        {isSmallScreen ? (
          <IconButton
            sx={{ marginLeft: '42px' }}
            color="inherit"
            onClick={() => setMenuDrawerOpen(!menuDrawerOpen)}
          >
            <MenuIcon style={{ fill: colors.BOOK_BLACK }} />
          </IconButton>
        ) : (
          <div className={styles.left}>
            <NavLink to=".">Home</NavLink>
            <NavLink to="contactbook">Contact Book</NavLink>
          </div>
        )}
        <div className={styles.right}>
          <div className={styles.userData}>
            {!isSmallScreen && user.username}
            {!isUltraSmallScreen && <Avatar alt="" src={user.avatar} />}
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
        <MenuDrawer open={menuDrawerOpen} setOpen={setMenuDrawerOpen} />
      </nav>
    </div>
  );
};

export default Menu;
