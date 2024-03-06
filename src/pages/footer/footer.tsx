import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

type StyleType = {
  [key: string]: React.CSSProperties;
};

const styles: StyleType = {
  footerContainer: {
    background: '#333',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center' as const, // Ensures textAlign value is correctly typed
  },
  footerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandName: {
    fontSize: '24px',
    margin: '0 0 10px',
  },
  contactInfo: {
    margin: '5px 0',
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10px',
  },
  socialIcon: {
    margin: '0 10px',
    color: '#fff',
    fontSize: '24px',
    textDecoration: 'none',
  },
};

const Footer: React.FC = () => {
  return (
    <footer style={styles.footerContainer}>
      <div style={styles.footerContent}>
        <h3 style={styles.brandName}>Your Brand</h3>
        <p style={styles.contactInfo}>123 Brand Street, City, Country</p>
        <p style={styles.contactInfo}>email@example.com</p>
        <p style={styles.contactInfo}>+123 456 7890</p>
        <div style={styles.socialLinks}>
          <a href="https://facebook.com" style={styles.socialIcon}><FaFacebook /></a>
          <a href="https://twitter.com" style={styles.socialIcon}><FaTwitter /></a>
          <a href="https://instagram.com" style={styles.socialIcon}><FaInstagram /></a>
          <a href="https://linkedin.com" style={styles.socialIcon}><FaLinkedin /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
