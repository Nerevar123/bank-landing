// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";

import React, { useEffect, useContext } from "react";
import cn from "classnames";
import Button from "../button/button";
import Input from "../input/input";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import detailsStyles from "./details.module.css";

function Details({ validation }) {
  const { values, errors, isValid, resetForm, setIsValid } = validation;
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm(currentUser);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [currentUser, resetForm]);

  return (
    <section className={detailsStyles.section}>
      <h1 className={detailsStyles.title}>Please provide your details:</h1>
      <form
        className={detailsStyles.form}
        name="login"
        // onSubmit={handleSubmit}
        method="GET"
      >
        <fieldset className={detailsStyles.fields}>
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="name"
            placeholder="First name"
            required
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="surname"
            placeholder="Family name"
            required
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="id"
            placeholder="ID number"
            required
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="birthDate"
            placeholder="Date of birth"
            required
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="tel"
            placeholder="Phone number"
            required
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="email"
            placeholder="Email"
            required
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="companyName"
            placeholder="Company name"
            required
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="companyNumber"
            placeholder="Company number (ח.פ .)"
            required
          />
          <span
            className={`login__error ${
              errors.submit ? "login__error_active" : ""
            }`}
          >
            {errors.submit || ""}
          </span>
        </fieldset>
        {/* <div className={detailsStyles.buttons}> */}
          {/* <Button
            className={detailsStyles.button}
            type="submit"
            disabled={!isValid}
          >
            Back
          </Button> */}
          <Button
            className={cn(detailsStyles.button, {
              [detailsStyles.button]: !isValid,
            })}
            type="submit"
            disabled={!isValid}
          >
            Next
          </Button>
        {/* </div> */}
      </form>
    </section>
  );
}

export default Details;
