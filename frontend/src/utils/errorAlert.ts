import Swal from 'sweetalert2';
import * as color from '../styles/bookColors'

const errorAlert = (text: string) => {
  Swal.fire({
    showConfirmButton: false,
    icon: 'warning',
    iconColor: color.BOOK_ORANGE,
    width: 450,
    title: 'Oops...',
    text: text,
    showCloseButton: true,
    color: color.BOOK_BLACK,
    background: color.BOOK_WHITE
  });
};

export default errorAlert;
