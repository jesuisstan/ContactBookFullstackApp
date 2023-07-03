import * as colors from './bookColors';

export const modalDialog = {
  width: 'auto',
  maxWidth: '442px',
  minWidth: '300px',
  border: '0px solid #000',
  bgcolor: 'whitesmoke',
  borderRadius: '4px',
  paddingBottom: '30px'
};

export const modalHeader = {
  fontFamily: 'GT Walsheim Pro, Arial, sans-serif',
  fontSize: '1.2rem',
  letterSpacing: '0.02857em',
  textAlign: 'center',
  fontWeight: 'bold',
  paddingBottom: '18px'
};

export const modalClose = {
  position: 'absolute',
  top: 'calc(-1/4 * var(--IconButton-size))',
  right: 'calc(-1/4 * var(--IconButton-size))',
  boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
  borderRadius: '50%',
  color: colors.BOOK_BLACK,
  bgcolor: colors.BOOK_ORANGE,
  transition: 'background-color 0.2s, color 0.2s ease-in-out',
  ':hover': {
    color: 'whitesmoke',
    bgcolor: colors.BOOK_BLACK
  }
};

export const LoadButton = {
  fontFamily: 'GT Walsheim Pro, Arial, sans-serif',
  fontWeight: 'bold',
  minWidth: 142,
  borderRadius: '90px',
  backgroundColor: colors.BOOK_ORANGE,
  color: colors.BOOK_BLACK,
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  ':hover': {
    color: colors.BOOK_WHITE,
    bgcolor: colors.BOOK_BLACK
  }
};
