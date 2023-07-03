import { SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  createTheme,
  ThemeProvider
} from '@mui/material';
import * as colors from '../../styles/bookColors';

const theme = createTheme({
  typography: {
    fontFamily: 'GT Walsheim Pro, Arial, sans-serif' // Specify Montserrat as the first choice
  }
});

const burgerItem = {
  transition: 'transform 0.5s ease-in-out, color 0.2s ease-out',
  fontWeight: '500',
  letterSpacing: '0.02857em',
  ':hover': {
    color: colors.BOOK_WHITE,
    cursor: 'pointer'
  }
};

const BookDrawer = ({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        PaperProps={{
          style: {
            backgroundColor: colors.BOOK_GREEN_TRANS
          }
        }}
        anchor="left"
        open={open}
        onClose={handleDrawerToggle}
      >
        <List sx={{ color: colors.BOOK_BLACK }}>
          <ListItem
            onClick={() => {
              navigate('/');
              setOpen(false);
            }}
          >
            <ListItemText primary="Home" disableTypography sx={burgerItem} />
          </ListItem>
          <ListItem
            onClick={() => {
              navigate('/contactbook');
              setOpen(false);
            }}
          >
            <ListItemText
              primary="Contacts"
              disableTypography
              sx={burgerItem}
            />
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default BookDrawer;
