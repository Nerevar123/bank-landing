import { useEffect } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import Section from "../section/section";
import Form from "../form/form";
import Input from "../input/input";
import Button from "../button/button";
import Preloader from "../preloader/preloader";
import loginStyles from "./login.module.css";

function Login({ validation, onAuthorize, isSaving }) {
  const { values, errors, isValid, resetForm } = validation;

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthorize({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Section title="Sign In">
      <Form className={loginStyles.form} name="login" onSubmit={handleSubmit}>
        <fieldset className={loginStyles.fields}>
          <Input
            validation={validation}
            labelClassName={loginStyles.label}
            name="email"
            placeholder="Email"
            autoComplete="email"
            autoFocus
            type="email"
            required
          />
          <Input
            validation={validation}
            labelClassName={loginStyles.label}
            name="password"
            placeholder="Password"
            type="password"
            required
            minLength="4"
            autoComplete="current-password"
          />
        </fieldset>
        <Button
          type="submit"
          disabled={!isValid || isSaving}
          className={loginStyles.button}
        >
          {isSaving ? <Preloader /> : "Sign In"}
        </Button>
        <p className={loginStyles.text}>
          or{" "}
          <Link to="/register" className={loginStyles.link}>
            Sign Up
          </Link>
        </p>
        <span
          className={cn(loginStyles.submitError, {
            [loginStyles.submitErrorActive]: [errors.submit],
          })}
        >
          {errors.submit || ""}
        </span>
      </Form>
    </Section>
  );
}

export default Login;
