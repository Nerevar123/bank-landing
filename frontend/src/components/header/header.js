import { Link } from "react-router-dom";
import cn from "classnames";
import useWindowSize from "../../hooks/useWindowSize";
import logo from "../../images/logo.png";
import headerStyles from "./header.module.css";

import Navigation from "../header-nav/header-nav";
// import Button from "../Button/Button";
// import ClosablePopup from "../hocs/ClosablePopup";
// import { CSSTransition } from "react-transition-group";
// import Popup from "../Popup/Popup";

function Header({
  isLoggedIn,
  isRegisterPopupOpen,
  isLoginPopupOpen,
  onLoginClick,
  onLogoutClick,
  onClose,
  isButtonClicked,
  setIsButtonClicked,
  onButtonClick,
  refs,
}) {
  const size = useWindowSize();
  const isPopupOpen = isLoginPopupOpen || isRegisterPopupOpen;

  return (
    <header
      className={cn(
        headerStyles.header,
        { [headerStyles.opened]: isButtonClicked },
        { [headerStyles.hided]: isPopupOpen }
      )}
    >
      <Link to="/" className={headerStyles.logo}>
        <img src={logo} alt="BTB logo" className={headerStyles.logo} />
      </Link>
      <Navigation
        isButtonClicked={isButtonClicked}
        setIsButtonClicked={setIsButtonClicked}
        isLoggedIn={isLoggedIn}
        onLoginClick={onLoginClick}
        onLogoutClick={onLogoutClick}
      />
      {/* {size.width < 740 && (
          <Button
            className={`header__menu-button ${
              isButtonClicked ? "header__menu-button_clicked" : ""
            }`}
            type="button"
            onClick={onButtonClick}
          />
      )} */}
      {/* <CSSTransition
        nodeRef={refs}
        in={isButtonClicked}
        timeout={300}
        classNames="popup"
        unmountOnExit
      >
        <ClosablePopup>
          <Popup onClose={onClose} refs={refs} />
        </ClosablePopup>
      </CSSTransition> */}
      {/* <ul className={headerStyles.links}>
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
      </ul> */}
    </header>
  );
}

export default Header;
