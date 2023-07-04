import { SetStateAction, Dispatch } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';
import * as colors from '../../styles/bookColors';
import * as MUI from '../../styles/MUIstyles';

const CardDrawer = ({
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
      <div>
        <h1>Modifying the contact GG</h1>
      </div>
    </Drawer>
  );
};

export default CardDrawer;
