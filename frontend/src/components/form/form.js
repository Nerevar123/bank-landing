import cn from "classnames";
import formStyles from "./form.module.css";

function Form({ className, name, onSubmit, children }) {
  return (
    <form
      className={cn(formStyles.form, className)}
      name={name}
      onSubmit={onSubmit}
      method="GET"
    >
      {children}
    </form>
  );
}

export default Form;
