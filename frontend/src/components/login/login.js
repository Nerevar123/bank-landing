import { useEffect } from "react";
import Input from "../input/input";
import Button from "../button/button";
import loginStyles from "./login.module.css";

function Login({ validation, onAuthorize }) {
  const { values, errors, isValid, resetForm } = validation;

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onAuthorize({
      email: values.email,
      password: values.password,
    });
  }

  return (
    <section className="login">
      <h2 className={loginStyles.title}>Sign in</h2>
      <form
        className={loginStyles.form}
        name="login"
        onSubmit={handleSubmit}
        method="GET"
      >
        <fieldset className={loginStyles.fields}>
          <Input
            validation={validation}
            name="email"
            placeholder="Email"
            autoComplete="email"
            autoFocus
            type="email"
            required
          />
          <Input
            validation={validation}
            name="password"
            placeholder="Password"
            type="password"
            required
            minLength="4"
            autoComplete="current-password"
          />
          <span
            className={`login__error ${
              errors.submit ? "login__error_active" : ""
            }`}
          >
            {errors.submit || ""}
          </span>
        </fieldset>
        <Button
          type="submit"
          disabled={!isValid}
          className={`login__save-button ${
            !isValid ? "login__save-button_disabled" : ""
          }`}
        >
          Sign In
        </Button>
      </form>
    </section>
  );
}

export default Login;
