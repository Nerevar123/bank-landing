import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Section from "../section/section";
import Buttons from "../buttons-container/buttons-container";
import Button from "../button/button";
import Form from "../form/form";
import InputSlider from "../input-slider/input-slider";
import Preloader from "../preloader/preloader";
import loanStyles from "./loan.module.css";

function Loan({ goBack, onSubmit, isSaving }) {
  const [values, setValues] = useState({ amount: "500000", term: "6" });
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setValues({});
    if (currentUser.loan.length !== 0) {
      setValues(currentUser.loan[0]);
    }
  }, [currentUser.loan]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    onSubmit({
      amount: values.amount || "500000",
      term: values.term || "6",
    });
  };

  return (
    <Section title="Please choose the loan amount and term:">
      <Form className={loanStyles.form} name="details" onSubmit={handleSubmit}>
        <fieldset className={loanStyles.fields}>
          <InputSlider
            overlay="₪"
            min={100000}
            max={1000000}
            defaultValue={
              currentUser.loan.length !== 0
                ? currentUser.loan[0].amount
                : 500000
            }
            step={50000}
            marks={{ 100000: 100000, 1000000: 1000000 }}
            values={values}
            setValues={setValues}
            name="amount"
          />
          <InputSlider
            overlay="years"
            min={4}
            max={8}
            defaultValue={
              currentUser.loan.length !== 0 ? currentUser.loan[0].term : 6
            }
            step={0.5}
            marks={{ 4: 4, 8: 8 }}
            values={values}
            setValues={setValues}
            name="term"
          />
        </fieldset>
        <Buttons>
          <Button className={loanStyles.button} type="button" onClick={goBack}>
            Back
          </Button>
          <Button
            className={loanStyles.button}
            type="submit"
            disabled={isSaving}
          >
            {isSaving ? <Preloader /> : "Submit"}
          </Button>
        </Buttons>
      </Form>
    </Section>
  );
}

export default Loan;
