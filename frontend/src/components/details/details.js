import { useEffect, useContext } from "react";
import cn from "classnames";
import Section from "../section/section";
import Form from "../form/form";
import Button from "../button/button";
import Input from "../input/input";
import Preloader from "../preloader/preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import detailsStyles from "./details.module.css";

function Details({ validation, onSubmit, isSaving }) {
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
    onSubmit({
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
      <Form name="details" onSubmit={handleSubmit}>
        <fieldset className={detailsStyles.fields}>
          <Input
            validation={validation}
            className={detailsStyles.input}
            phClassName={detailsStyles.placeholder}
            errorClassName={detailsStyles.inputError}
            name="name"
            placeholder="First name*"
            required
            minLength="2"
            maxLength="20"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            phClassName={detailsStyles.placeholder}
            errorClassName={detailsStyles.inputError}
            name="surname"
            placeholder="Family name*"
            required
            minLength="2"
            maxLength="20"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            phClassName={detailsStyles.placeholder}
            errorClassName={detailsStyles.inputError}
            name="id"
            placeholder="ID number*"
            required
            minLength="9"
            maxLength="12"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            phClassName={detailsStyles.placeholder}
            errorClassName={detailsStyles.inputError}
            name="birthDate"
            placeholder="Date of birth*"
            required
            type="date"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            phClassName={detailsStyles.placeholder}
            errorClassName={detailsStyles.inputError}
            name="tel"
            placeholder="Phone number"
            minLength="9"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            phClassName={detailsStyles.placeholder}
            errorClassName={detailsStyles.inputError}
            name="email"
            placeholder="Email*"
            required
            disabled
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            phClassName={detailsStyles.placeholder}
            errorClassName={detailsStyles.inputError}
            name="companyName"
            placeholder="Company name*"
            required
            minLength="2"
            maxLength="30"
          />
          <Input
            validation={validation}
            className={detailsStyles.input}
            phClassName={detailsStyles.placeholder}
            errorClassName={detailsStyles.inputError}
            name="companyNumber"
            placeholder="Company number (ח.פ .)*"
            required
            minLength="2"
            maxLength="30"
          />
        </fieldset>
        <Button
          className={cn(detailsStyles.button, {
            [detailsStyles.button]: !isValid,
          })}
          type="submit"
          disabled={!isValid || isSaving}
        >
          {isSaving ? <Preloader /> : "Next"}
        </Button>
        <span
          className={cn(detailsStyles.submitError, {
            [detailsStyles.submitErrorActive]: [errors.submit],
          })}
        >
          {errors.submit || ""}
        </span>
      </Form>
    </Section>
  );
}

export default Details;
