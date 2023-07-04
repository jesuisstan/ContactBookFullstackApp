import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import * as MUI from '../styles/MUIstyles';
import * as colors from '../styles/bookColors';
import * as fetcher from '../utils/fetcher';

const ContactBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allContacts, setAllContacts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetcher.getAllContacts();
        setAllContacts(data);
      } catch (error) {
        console.error('Error retrieving contacts:', error);
      }
    };

    fetchData();
  }, []);

  console.log(allContacts)
  console.log(allContacts[1])


  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '21px'
      }}
    >
      <h1>item</h1>

      <h1>item</h1>
      <h1>item</h1>


    </div>
  );
};

export default ContactBook;
