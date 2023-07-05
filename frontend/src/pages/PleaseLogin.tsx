import { useEffect, useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';
import BarLoader from 'react-spinners/BarLoader';
import * as colors from '../styles/bookColors';

const PleaseLogin = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <div
      style={{
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '21px',
        color: colors.BOOK_GREEN,
        justifyContent: 'center'
      }}
    >
      <p>loading...</p>
      <BarLoader
        color={colors.BOOK_GREEN}
        loading={loading}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  ) : (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '21px'
      }}
    >
      <ErrorOutlineIcon fontSize="large" sx={{ color: colors.BOOK_ORANGE }} />
      <h1>Please login to continue</h1>
      <CallMissedOutgoingIcon
        fontSize="large"
        sx={{ color: colors.BOOK_ORANGE }}
      />
    </div>
  );
};

export default PleaseLogin;
