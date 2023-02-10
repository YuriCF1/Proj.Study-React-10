import React from "react";

import styles from "./Footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <h3>Escreva o que tens de interessante</h3>
      <p>Mini Blog &copy; {year}</p>
    </footer>
  );
};

export default Footer;
