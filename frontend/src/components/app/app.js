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

function App() {
  const history = useHistory();
  const validation = useFormWithValidation();
  return (
    <Router history={history} basename="/">
      <Header />
      <main className={appStyles.main}>
        <Switch>
          <Route exact path="/">
            <Login validation={validation} />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/details">
            <Details />
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
  );
}

export default App;
