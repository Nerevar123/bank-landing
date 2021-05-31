import { useRef, useState } from "react";
import cn from "classnames";
import inputBankStyles from "./input-bank.module.css";

function InputBank({ name, compileSubmitData }) {
  const selectInputRef = useRef();
  const branchInputRef = useRef();
  const numberInputRef = useRef();

  const compileData = () => {
    const data = {
      name: name,
      values: {
        bank: selectInputRef.current.value,
        branch: branchInputRef.current.value,
        number: numberInputRef.current.value,
      },
    };
    return data;
  };

  const handleChange = () => {
    const data = compileData();
    compileSubmitData(data);
  };

  return (
    <fieldset className={inputBankStyles.fields}>
      <label htmlFor="standard-select" className={inputBankStyles.bankLabel}>
        <select
          className={inputBankStyles.select}
          id="standard-select"
          ref={selectInputRef}
          onChange={handleChange}
          name="bank"
        >
          <option value="Hapoalim">Hapoalim</option>
          <option value="Leumi">Leumi</option>
          <option value="Mizrahi-Tefahot">Mizrahi-Tefahot</option>
          <option value="HaBeinleumi">HaBeinleumi</option>
          <option value="Discount">Discount</option>
        </select>
      </label>
      {/* <div className="select"> */}

      {/* <span class="focus"></span>
    </div> */}
      <label className={inputBankStyles.label}>
        <input
          className={inputBankStyles.input}
          type="text"
          placeholder="Branch"
          ref={branchInputRef}
          onChange={handleChange}
          name="branch"
        />
      </label>
      <label className={inputBankStyles.label}>
        <input
          className={inputBankStyles.input}
          type="text"
          placeholder="Number"
          ref={numberInputRef}
          onChange={handleChange}
          name="number"
        />
      </label>

      {/* <Input
      validation={validation}
      className={accountsStyles.input}
      name="name"
      placeholder="First name"
      required
    /> */}
    </fieldset>
  );
}

export default InputBank;
