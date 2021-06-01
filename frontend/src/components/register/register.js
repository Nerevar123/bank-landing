import { useEffect } from "react";
import { Link } from "react-router-dom";
import Section from "../section/section";
import Form from "../form/form";
import Button from "../button/button";
import Input from "../input/input";
import registerStyles from "./register.module.css";

function Register({ validation, onRegister }) {
  const { values, errors, isValid, resetForm } = validation;

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
      surname: values.surname,
      id: values.id,
      birthDate: values.birthDate,
      companyName: values.companyName,
      companyNumber: values.companyNumber,
    });
  };

  return (
    <Section title="Sign Up">
      <Form name="details" onSubmit={handleSubmit}>
        <fieldset className={registerStyles.fields}>
          <Input
            validation={validation}
            className={registerStyles.input}
            phClassName={registerStyles.placeholder}
            errorClassName={registerStyles.inputError}
            name="email"
            placeholder="Email"
            autoComplete="email"
            autoFocus
            type="email"
            required
          />
          <Input
            validation={validation}
            className={registerStyles.input}
            phClassName={registerStyles.placeholder}
            errorClassName={registerStyles.inputError}
            name="password"
            placeholder="Password"
            type="password"
            required
            minLength="4"
            autoComplete="current-password"
          />
          <Input
            validation={validation}
            className={registerStyles.input}
            phClassName={registerStyles.placeholder}
            errorClassName={registerStyles.inputError}
            name="name"
            placeholder="First name*"
            required
            minLength="2"
            maxLength="20"
          />
          <Input
            validation={validation}
            className={registerStyles.input}
            phClassName={registerStyles.placeholder}
            errorClassName={registerStyles.inputError}
            name="surname"
            placeholder="Family name*"
            required
            minLength="2"
            maxLength="20"
          />
          <Input
            validation={validation}
            className={registerStyles.input}
            phClassName={registerStyles.placeholder}
            errorClassName={registerStyles.inputError}
            name="id"
            placeholder="ID number*"
            required
            minLength="9"
            maxLength="12"
          />
          <Input
            validation={validation}
            className={registerStyles.input}
            phClassName={registerStyles.placeholder}
            errorClassName={registerStyles.inputError}
            name="birthDate"
            placeholder="Date of birth*"
            required
            type="date"
          />
          <Input
            validation={validation}
            className={registerStyles.input}
            phClassName={registerStyles.placeholder}
            errorClassName={registerStyles.inputError}
            name="companyName"
            placeholder="Company name*"
            required
            minLength="2"
            maxLength="30"
          />
          <Input
            validation={validation}
            className={registerStyles.input}
            phClassName={registerStyles.placeholder}
            errorClassName={registerStyles.inputError}
            name="companyNumber"
            placeholder="Company number (ח.פ .)*"
            required
            minLength="2"
            maxLength="30"
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
          className={registerStyles.button}
        >
          Sign Up
        </Button>
        <p className={registerStyles.text}>
          or{" "}
          <Link to="/" className={registerStyles.link}>
            Sign In
          </Link>
        </p>
      </Form>
    </Section>
  );
}

export default Register;
