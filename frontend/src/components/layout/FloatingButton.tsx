import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import * as colors from '../../styles/bookColors';

const FloatingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1,
        color: colors.BOOK_BLACK,
        '&:hover': {
          color: colors.BOOK_WHITE
        }
      }}
    >
      <Fab
        sx={{
          bgcolor: colors.BOOK_ORANGE,
          '&:hover': {
            bgcolor: colors.BOOK_BLACK
          }
        }}
        color="inherit"
        aria-label="edit"
        onClick={onClick}
        title="Add new contact"
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default FloatingButton;
