import { useState } from 'react';
import { CardActionArea, CardActions, ThemeProvider } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Contact } from '../../types/Contact';
import * as utils from '../../utils/contactsHandlers';
import * as colors from '../../styles/bookColors';
import * as MUI from '../../styles/MUIstyles';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

const ContactCard = ({
  contact,
  setRenderingTrigger
}: {
  contact: Contact;
  setRenderingTrigger: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClick = async () => {
    await utils.deleteContact(contact);
    setRenderingTrigger((prev) => prev + 1);
  };

  return (
    <ThemeProvider theme={MUI.theme}>
      <Card sx={MUI.contactCard} onClick={() => console.log('OPEN')}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {contact!.firstName}
              <br />
              {contact!.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {contact!.birthday && (
                <>
                  Birthday: {contact!.birthday}
                  <br />
                </>
              )}
              Email: {contact!.email}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <IconButton
            aria-label="delete"
            title="delete contact"
            onClick={handleDeleteClick}
          >
            <DeleteIcon sx={{ color: colors.BOOK_ORANGE }} />
          </IconButton>
          <IconButton aria-label="modify" title="modify contact">
            <DriveFileRenameOutlineIcon sx={{ color: colors.BOOK_GREEN }} />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon sx={{ color: colors.BOOK_GREEN }} />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2">
              {contact!.comment ? contact!.comment : '*no comment left'}
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </ThemeProvider>
  );
};

export default ContactCard;
