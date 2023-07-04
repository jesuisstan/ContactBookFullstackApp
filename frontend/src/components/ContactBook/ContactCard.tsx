import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Contact } from '../../types/Contact';
import LoadingButton from '@mui/lab/LoadingButton';
import * as MUI from '../../styles/MUIstyles';
import DeleteIcon from '@mui/icons-material/Delete';
import * as utils from '../../utils/contactsHandlers';
import { useState } from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const ContactCard = ({
  contact,
  setRenderingTrigger
}: {
  contact: Contact;
  setRenderingTrigger: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDeleteClick = async () => {
    setLoadingDelete(true);
    await utils.deleteContact(contact);
    setLoadingDelete(false);
    setRenderingTrigger((prev) => prev + 1);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {contact.firstName} {contact.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Birthday: {contact.birthday} <br />
            Email: {contact.email} <br />
            {contact.comment}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <IconButton
          aria-label="delete"
          title="delete contact"
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
				<IconButton aria-label="modify"
          title="modify contact"
					>
          <DriveFileRenameOutlineIcon />
        </IconButton>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default ContactCard;
