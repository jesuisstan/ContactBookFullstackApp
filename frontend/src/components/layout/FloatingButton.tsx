import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const FloatingButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: '60px',
        left: '60px',
      }}
    >
      <Fab color="secondary" aria-label="edit" onClick={onClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
}

export default FloatingButton;