import { Link } from "react-router-dom";
import Navigation from "../header-nav/header-nav";
import headerStyles from "./header.module.css";
import logo from "../../images/logo.png";

function Header({ isLoggedIn, onLoginClick, onLogoutClick }) {
  return (
    <header className={headerStyles.header}>
      <Link to="/" className={headerStyles.logo}>
        <img src={logo} alt="BTB logo" className={headerStyles.logo} />
      </Link>
      <Navigation
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
      />
    </header>
  );
}

export default Header;
