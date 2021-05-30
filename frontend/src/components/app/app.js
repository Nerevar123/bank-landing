import React, { useState, useEffect, createContext } from "react";
import { Router, Route, Switch, useHistory } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import Header from "../header/header";
import Login from "../login/login";
import Register from "../register/register";
import Details from "../details/details";
import Accounts from "../accounts/accounts";
import Loan from "../loan/loan";
import Footer from "../footer/footer";
import appStyles from "./app.module.css";
import { login, logout, getUserInfo } from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const history = useHistory();
  const validation = useFormWithValidation();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    getUserInfo()
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleLogin(user) {
    setIsSaving(true);
    login(user)
      .then((user) => {
        setIsLoggedIn(true);
        console.log(user);
        setCurrentUser(user);
        // closeAllPopups();
        history.push("/details");
      })
      .catch((err) => {
        if (typeof err === "object") {
          validation.setErrors({ submit: "Internal Server Error" });
        } else {
          validation.setErrors({ submit: err });
        }
        console.log(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  function handleLogout() {
    logout()
      .then(() => {
        setIsLoggedIn(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Router history={history} basename="/">
        <Header isLoggedIn={isLoggedIn} onLogoutClick={handleLogout} />
        <main className={appStyles.main}>
          <Switch>
            <Route exact path="/">
              <Login validation={validation} onAuthorize={handleLogin} />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/details">
              <Details validation={validation} />
            </Route>
            <Route exact path="/accounts">
              <Accounts />
            </Route>
            <Route exact path="/loan">
              <Loan />
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </CurrentUserContext.Provider>
  );
}

export default App;
