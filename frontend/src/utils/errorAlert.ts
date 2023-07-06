import Swal from 'sweetalert2';
import * as colors from '../styles/bookColors'

const errorAlert = (text: string) => {
  Swal.fire({
    showConfirmButton: false,
    icon: 'warning',
    iconColor: colors.BOOK_ORANGE,
    width: 450,
    title: 'Oops...',
    text: text,
    showCloseButton: true,
    color: colors.BOOK_BLACK,
    background: colors.BOOK_WHITE
  });
};

export default errorAlert;
