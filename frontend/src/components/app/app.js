import React, { useState, useEffect } from "react";
import { Router, Route, Switch, useHistory, Redirect } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import Header from "../header/header";
import Login from "../login/login";
import Register from "../register/register";
import Details from "../details/details";
import Accounts from "../accounts/accounts";
import Loan from "../loan/loan";
import Footer from "../footer/footer";
import Preloader from "../preloader/preloader";
import appStyles from "./app.module.css";
import { login, logout, getUserInfo, patchDetails } from "../../utils/api";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../hocs/ProtectedRoute";

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
        // history.push("/details");
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
  }, []);

  const handleLogin = (user) => {
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
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        setIsLoggedIn(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePatchDetails = (data) => {
    patchDetails(data)
      .then((user) => {
        setCurrentUser(user);
        history.push("/accounts");
      })
      .catch((err) => {
        if (typeof err === "object") {
          validation.setErrors({ submit: "Ошибка сервера" });
        } else {
          validation.setErrors({ submit: err });
        }
        console.log(err);
      });
  };

  if (isLoggedIn === null) {
    return <Preloader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Router history={history} basename="/">
        <Header isLoggedIn={isLoggedIn} onLogoutClick={handleLogout} />
        <main className={appStyles.main}>
          <Switch>
            <Route exact path="/register">
              <Register />
            </Route>
            <ProtectedRoute exact path="/details" loggedIn={isLoggedIn}>
              <Details
                validation={validation}
                onPatchDetails={handlePatchDetails}
              />
            </ProtectedRoute>
            <ProtectedRoute exact path="/accounts" loggedIn={isLoggedIn}>
              <Accounts validation={validation} goBack={history.goBack} />
            </ProtectedRoute>
            <ProtectedRoute exact path="/loan" loggedIn={isLoggedIn}>
              <Loan />
            </ProtectedRoute>
            <Route exact path="/">
              {isLoggedIn ? (
                <Redirect to="/details" />
              ) : (
                <Login validation={validation} onAuthorize={handleLogin} />
              )}
            </Route>
          </Switch>
        </main>
        <Footer />
      </Router>
    </CurrentUserContext.Provider>
  );
}

export default App;
