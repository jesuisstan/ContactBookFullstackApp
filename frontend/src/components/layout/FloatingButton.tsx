import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import NavigationIcon from '@mui/icons-material/Navigation';

const FloatingButton = () => {
  return (

      <Fab color="secondary" aria-label="edit">
        <EditIcon />
      </Fab>

  );
}

export default FloatingButton