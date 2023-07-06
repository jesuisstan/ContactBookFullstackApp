import { useState, SetStateAction, Dispatch } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import * as MUI from '../../styles/MUIstyles';
import * as colors from '../../styles/bookColors';

const LoginModal = ({
  open,
  setOpen
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [loadGit, setLoadGit] = useState(false);
  const [loadGoogle, setLoadGoogle] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const google = () => {
    window.location.href = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/auth/google`;
  };

  const github = () => {
    window.location.href = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/auth/github`;
  };

  return (
    <Modal
      sx={{ color: colors.BOOK_BLACK }}
      open={open}
      onClose={(event, reason) => {
        if (event && reason === 'closeClick') {
          setOpen(false);
        }
      }}
    >
      <ModalDialog
        aria-labelledby="basic-modal-dialog-title"
        sx={MUI.modalDialog}
      >
        <ModalClose sx={MUI.modalClose} />
        <Typography sx={MUI.modalHeader}>Please login</Typography>
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
                google();
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
                github();
              }}
            >
              Github
            </LoadingButton>
          </div>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default LoginModal;
