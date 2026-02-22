/*
Footer component.
*/

import styles from '../../styles/Footer.module.css';
import useMediaQuery from '@mui/material/useMediaQuery';

const Footer: React.FC = () => {
  const isSmallScreen = useMediaQuery('(max-width:350px)');

  return (
    <div className={styles.footerBasic}>
      <footer>
        <p className={styles.copyright}>
          {!isSmallScreen && (
            <>Contact Book Fullstack App © 2023 | Frontend assessment | </>
          )}
          <a
            href="https://github.com/jesuisstan/ContactBookFullstackApp"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            @github
          </a>
          <>
            {' '}
            | Made by{' '}
            <a
              href="https://www.krivtsoff.site/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerLink}
            >
              Stanislav Krivtsov
            </a>
          </>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
