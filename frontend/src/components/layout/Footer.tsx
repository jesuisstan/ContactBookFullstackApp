/*
Footer component.
*/

import styles from '../../styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footerBasic}>
      <footer>
        <p className={styles.copyright}>
          Contact Book Fullstack App © 2023 | Frontend assessment |{' '}
          <a
            href="https://github.com/jesuisstan/ContactBookFullstackApp"
            className={styles.footerLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            @github
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
