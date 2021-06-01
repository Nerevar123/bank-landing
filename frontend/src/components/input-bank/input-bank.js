import { useRef, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import inputBankStyles from "./input-bank.module.css";

function InputBank({ index, compileSubmitData }) {
  const currentUser = useContext(CurrentUserContext);
  const selectInputRef = useRef();
  const branchInputRef = useRef();
  const numberInputRef = useRef();

  useEffect(() => {
    if (currentUser.accounts) {
      selectInputRef.current.value = currentUser.accounts[index].bank;
      branchInputRef.current.value = currentUser.accounts[index].branch;
      numberInputRef.current.value = currentUser.accounts[index].number;
    }
  }, [currentUser.accounts, index]);

  const compileData = () => {
    const data = {
      name: index,
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
          name="bank"
          ref={selectInputRef}
          onChange={handleChange}
          disabled={currentUser.accounts}
        >
          <option value="Hapoalim">Hapoalim</option>
          <option value="Leumi">Leumi</option>
          <option value="Mizrahi-Tefahot">Mizrahi-Tefahot</option>
          <option value="HaBeinleumi">HaBeinleumi</option>
          <option value="Discount">Discount</option>
        </select>
      </label>
      <label className={inputBankStyles.label}>
        <input
          className={inputBankStyles.input}
          type="text"
          placeholder="Branch"
          name="branch"
          ref={branchInputRef}
          onChange={handleChange}
          disabled={currentUser.accounts}
        />
      </label>
      <label className={inputBankStyles.label}>
        <input
          className={inputBankStyles.input}
          type="text"
          placeholder="Number"
          name="number"
          ref={numberInputRef}
          onChange={handleChange}
          disabled={currentUser.accounts}
        />
      </label>
    </fieldset>
  );
}

export default InputBank;
