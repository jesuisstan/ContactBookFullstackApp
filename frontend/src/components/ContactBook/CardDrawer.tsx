import { SetStateAction, Dispatch, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import * as colors from '../../styles/bookColors';
import * as MUI from '../../styles/MUIstyles';
import BirthdayPicker from './BirthdayPicker';
import NameModifier from './NameModifier';
import LoadingButton from '@mui/lab/LoadingButton';
import * as utils from '../../utils/contactsHandlers';
import { User } from '../../types/User';

const CardDrawer = ({
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


  const newCon = {
    userID: user.id,
    firstName: 'Actung',
    lastName: 'Germann',
    //birthday: '01.08.2187',
    email: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx@gmail.com',
    comment: 'normal'
  };



  const [loadingSave, setLoadingSave] = useState(false);

  const handleSaveClick = async () => {
    setLoadingSave(true);
    await utils.createContact(newCon);
    setLoadingSave(false);
    setRenderingTrigger((prev) => prev + 1);
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
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
      <div style={{maxWidth: '300px', textAlign: 'center'}}>
        <h1>Modifying the contact GG</h1>
        <NameModifier />
        <BirthdayPicker />

        <LoadingButton
        loading={loadingSave}
        //startIcon={<GoogleIcon />}
        variant="contained"
        color="inherit"
        sx={MUI.LoadButton}
        onClick={handleSaveClick}
      >
        Save
      </LoadingButton>
      </div>
    </Drawer>
  );
};

export default CardDrawer;
