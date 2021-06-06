import { useState, useEffect, useContext } from "react";
import cn from "classnames";
import Section from "../section/section";
import Form from "../form/form";
import Buttons from "../buttons-container/buttons-container";
import Button from "../button/button";
import InputBank from "../input-bank/input-bank";
import Preloader from "../preloader/preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import accountsStyles from "./accounts.module.css";

function Accounts({ goBack, onSubmit, isSaving }) {
  const currentUser = useContext(CurrentUserContext);
  const [activeFields, setActiveFields] = useState(1);
  const [dataToSubmit, setDataToSubmit] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (currentUser.accounts) {
      setActiveFields(Object.keys(currentUser.accounts).length);
      setDataToSubmit(currentUser.accounts);
      setIsValid(true);
    }
  }, [currentUser.accounts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(dataToSubmit);
  };

  const compileSubmitData = (data) => {
    setDataToSubmit({ ...dataToSubmit, [data.name]: data.values });
    setIsValid(true);
  };

  const addField = () => {
    if (activeFields === 6) return;
    setActiveFields(activeFields + 1);
  };

  const deleteField = () => {
    if (activeFields === 1) return;
    setActiveFields(activeFields - 1);
  };

  return (
    <Section
      title={`Please fill bank accounts for "${currentUser.companyName}":`}
    >
      <p className={accountsStyles.subtitle}>
        Company number: {currentUser.companyNumber}
      </p>
      <Form
        className={accountsStyles.form}
        name="accounts"
        onSubmit={handleSubmit}
      >
        {Array.from(Array(activeFields)).map((x, i) => (
          <InputBank index={i} key={i} compileSubmitData={compileSubmitData} />
        ))}
        {!currentUser.accounts && (
          <Buttons>
            <Button
              className={cn(
                accountsStyles.addButton,
                accountsStyles.iconButton
              )}
              type="button"
              onClick={addField}
            ></Button>
            <Button
              className={cn(
                accountsStyles.deleteButton,
                accountsStyles.iconButton
              )}
              type="button"
              onClick={deleteField}
            ></Button>
          </Buttons>
        )}
        <Buttons>
          <Button
            className={accountsStyles.button}
            type="button"
            onClick={goBack}
          >
            Back
          </Button>
          <Button
            className={accountsStyles.button}
            type="submit"
            disabled={!isValid || isSaving}
          >
            {isSaving ? <Preloader /> : "Next"}
          </Button>
        </Buttons>
      </Form>
    </Section>
  );
}

export default Accounts;
