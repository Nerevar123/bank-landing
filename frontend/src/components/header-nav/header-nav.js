import React from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import Button from "../button/button";
import Preloader from "../preloader/preloader";
import useWindowSize from "../../hooks/useWindowSize";
import headerNavStyles from "./header-nav.module.css";

function Navigation({ isLoggedIn, onLoginClick, onLogoutClick, isSaving }) {
  const size = useWindowSize();
  return (
    <nav className={headerNavStyles.nav}>
      <ul className={headerNavStyles.links}>
        {isLoggedIn ? (
          <>
            {size.width > 950 && (
              <>
                <li className={headerNavStyles.linksItem}>
                  <NavLink
                    exact
                    to="/details"
                    className={headerNavStyles.link}
                    activeClassName={headerNavStyles.linkActive}
                  >
                    Details
                  </NavLink>
                </li>
                <li className={headerNavStyles.linksItem}>
                  <NavLink
                    exact
                    to="/accounts"
                    className={headerNavStyles.link}
                    activeClassName={headerNavStyles.linkActive}
                  >
                    Bank accounts
                  </NavLink>
                </li>
                <li className={headerNavStyles.linksItem}>
                  <NavLink
                    exact
                    to="/loan"
                    className={headerNavStyles.link}
                    activeClassName={headerNavStyles.linkActive}
                  >
                    Loan details
                  </NavLink>
                </li>
              </>
            )}
            <li className={headerNavStyles.linksItem}>
              <Button
                className={cn(
                  headerNavStyles.button,
                  headerNavStyles.buttonLogged
                )}
                type="button"
                onClick={onLogoutClick}
              >
                {isSaving ? <Preloader /> : "Log out"}
              </Button>
            </li>
          </>
        ) : (
          <li>
            <Button
              className={headerNavStyles.button}
              type="button"
              onClick={onLoginClick}
            >
              Log in
            </Button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
