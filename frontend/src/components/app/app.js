import React, { useState, useEffect } from "react";
import { Router, Route, Switch, useHistory, Redirect } from "react-router-dom";
import useFormWithValidation from "../../hooks/useFormWithValidation";
import Header from "../header/header";
import Login from "../login/login";
import Register from "../register/register";
import Success from "../success/success";
import Details from "../details/details";
import Accounts from "../accounts/accounts";
import Loan from "../loan/loan";
import Footer from "../footer/footer";
import Preloader from "../preloader/preloader";
import appStyles from "./app.module.css";
import {
  register,
  login,
  logout,
  getUserInfo,
  patchDetails,
  putAccounts,
  putLoan,
} from "../../utils/api";
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
      })
      .catch((err) => {
        setIsLoggedIn(false);
        console.log(err);
      });
  }, []);

  const checkError = (err) => {
    if (typeof err === "object") {
      validation.setErrors({ submit: "500 Internal error" });
    } else {
      validation.setErrors({ submit: err });
    }
    console.log(err);
  };

  const handleLogin = (user) => {
    setIsSaving(true);
    login(user)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
        history.push("/details");
      })
      .catch((err) => {
        checkError(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  function handleRegister(user) {
    setIsSaving(true);
    register(user)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        checkError(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  const handleLogout = () => {
    setIsSaving(true);
    logout()
      .then(() => {
        setIsLoggedIn(false);
        history.push("/");
      })
      .catch((err) => {
        history.push("/");
        console.log(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handlePatchDetails = (data) => {
    setIsSaving(true);
    patchDetails(data)
      .then((user) => {
        setCurrentUser(user);
        history.push("/accounts");
      })
      .catch((err) => {
        checkError(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handlePutAccounts = (data) => {
    setIsSaving(true);
    putAccounts(data)
      .then((user) => {
        setCurrentUser(user);
        history.push("/loan");
      })
      .catch((err) => {
        checkError(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handlePutLoan = (data) => {
    setIsSaving(true);
    putLoan(data)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(false);
        history.push("/success");
      })
      .catch((err) => {
        checkError(err);
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  if (isLoggedIn === null) {
    return <Preloader pageLoader />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Router history={history} basename="/">
        <Header
          isLoggedIn={isLoggedIn}
          onLogoutClick={handleLogout}
          onLoginClick={handleLogout}
          isSaving={isSaving}
        />
        <main className={appStyles.main}>
          <Switch>
            <Route exact path="/">
              {isLoggedIn ? (
                <Redirect to="/details" />
              ) : (
                <Login
                  validation={validation}
                  onAuthorize={handleLogin}
                  isSaving={isSaving}
                />
              )}
            </Route>
            <Route exact path="/register">
              <Register
                validation={validation}
                onRegister={handleRegister}
                isSaving={isSaving}
              />
            </Route>
            <ProtectedRoute exact path="/details" loggedIn={isLoggedIn}>
              <Details
                validation={validation}
                onSubmit={handlePatchDetails}
                isSaving={isSaving}
              />
            </ProtectedRoute>
            <ProtectedRoute exact path="/accounts" loggedIn={isLoggedIn}>
              <Accounts
                validation={validation}
                goBack={history.goBack}
                onSubmit={handlePutAccounts}
                isSaving={isSaving}
              />
            </ProtectedRoute>
            <ProtectedRoute exact path="/loan" loggedIn={isLoggedIn}>
              <Loan
                validation={validation}
                goBack={history.goBack}
                onSubmit={handlePutLoan}
                isSaving={isSaving}
              />
            </ProtectedRoute>
            <Route exact path="/success" loggedIn={isLoggedIn}>
              <Success goBack={handleLogout} />
            </Route>
          </Switch>
        </main>
      </Router>
      <Footer />
    </CurrentUserContext.Provider>
  );
}

export default App;
