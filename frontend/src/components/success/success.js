import { useContext } from "react";
import Section from "../section/section";
import Button from "../button/button";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import successStyles from "./success.module.css";

function Success({ goBack }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <Section title={`Thank you for your response, ${currentUser.name}!`}>
      <p className={successStyles.subtitle}>We will contact you soon</p>
      <Button type="button" onClick={goBack}>
        Back to main page
      </Button>
    </Section>
  );
}

export default Success;
