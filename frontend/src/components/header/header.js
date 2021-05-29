import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import headerStyles from "./header.module.css";

function Header() {
  return (
    <header className={headerStyles.header}>
      <img src={logo} alt="BTB logo" className={headerStyles.logo}/>
      <ul className={headerStyles.links}>
        <li className={headerStyles.linksItem}>
          <NavLink
            exact
            to="/"
            className={headerStyles.link}
            activeClassName={headerStyles.linkActive}
          >
            Log in
          </NavLink>
          <NavLink
            exact
            to="/register"
            className={headerStyles.link}
            activeClassName={headerStyles.linkActive}
          >
            Sign up
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
