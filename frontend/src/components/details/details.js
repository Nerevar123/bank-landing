import { useEffect, useContext } from "react";
import cn from "classnames";
import Section from "../section/section";
import Button from "../button/button";
import Input from "../input/input";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import detailsStyles from "./details.module.css";

function Details({ validation, onPatchDetails }) {
  const { values, errors, isValid, resetForm, setIsValid } = validation;
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    resetForm(currentUser);
    setIsValid(true);
    return () => {
      resetForm();
      setIsValid(false);
    };
  }, [currentUser, resetForm, setIsValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    onPatchDetails({
      name: values.name || currentUser.name,
      surname: values.surname || currentUser.surname,
      id: values.id || currentUser.id,
      birthDate: values.birthDate || currentUser.birthDate,
      tel: values.tel,
      email: currentUser.email,
      companyName: values.companyName || currentUser.companyName,
      companyNumber: values.companyNumber || currentUser.companyNumber,
    });
  };

  return (
    <Section title="Please provide your details:">
      <form
        className={detailsStyles.form}
        name="details"
        onSubmit={handleSubmit}
        method="GET"
      >
        <fieldset className={detailsStyles.fields}>
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="name"
            placeholder="First name*"
            required
            minLength="2"
            maxLength="20"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="surname"
            placeholder="Family name*"
            required
            minLength="2"
            maxLength="20"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="id"
            placeholder="ID number*"
            required
            minLength="9"
            maxLength="12"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="birthDate"
            placeholder="Date of birth*"
            required
            type="date"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="tel"
            placeholder="Phone number"
            minLength="9"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="email"
            placeholder="Email*"
            required
            disabled
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            name="companyName"
            placeholder="Company name*"
            required
            minLength="2"
            maxLength="30"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
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
    </Section>
  );
}

export default Details;
