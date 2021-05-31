import { useState, useContext } from "react";
import cn from "classnames";
import Section from "../section/section";
import Button from "../button/button";
import InputBank from "../input-bank/input-bank";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import accountsStyles from "./accounts.module.css";

function Accounts({ goBack }) {
  const currentUser = useContext(CurrentUserContext);
  const [activeFields, setActiveFields] = useState(3);
  const [dataToSubmit, setDataToSubmit] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataToSubmit);
  };

  const compileSubmitData = (data) => {
    setDataToSubmit({ ...dataToSubmit, [data.name]: data.values });
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
      <form
        className={accountsStyles.form}
        name="accounts"
        onSubmit={handleSubmit}
        method="GET"
      >
        {Array.from(Array(activeFields)).map((x, i) => (
          <InputBank name={i} key={i} compileSubmitData={compileSubmitData} />
        ))}
        <div className={accountsStyles.buttons}>
          <Button
            className={cn(accountsStyles.addButton, accountsStyles.iconButton)}
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
        </div>
        <div className={accountsStyles.buttons}>
          <Button
            className={accountsStyles.button}
            type="button"
            onClick={goBack}
          >
            Back
          </Button>
          <Button
            className={cn(accountsStyles.button, {
              // [accountsStyles.button]: !isValid,
            })}
            type="submit"
            // disabled={!isValid}
          >
            Next
          </Button>
        </div>
      </form>
    </Section>
  );
}

export default Accounts;
