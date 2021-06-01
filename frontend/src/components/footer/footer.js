import footerStyles from "./footer.module.css";

function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <p className={footerStyles.copyright}>© 2021 Menachem Neiman</p>
    </footer>
  );
}

export default Footer;
