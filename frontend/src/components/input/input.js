import cn from "classnames";
import inputStyles from "./input.module.css";

function Input({
  name,
  placeholder,
  validation,
  className,
  phClassName,
  errorClassName,
  labelClassName,
  ...props
}) {
  const { values, errors, handleChange } = validation;
  return (
    <label className={cn(inputStyles.label, labelClassName)}>
      <input
        name={name}
        className={cn(
          inputStyles.input,
          className,
          {
            [inputStyles.inputError]: errors[name],
          },
          { [errorClassName]: errors[name] }
        )}
        value={values[name] || ""}
        onChange={handleChange}
        {...props}
      />
      <span
        className={cn(inputStyles.placeholder, phClassName, {
          [inputStyles.placeholderFixed]: values[name],
        })}
      >
        {placeholder}
      </span>
      <span
        className={cn(inputStyles.error, {
          [inputStyles.errorActive]: errors[name],
        })}
      >
        {errors[name] || ""}
      </span>
    </label>
  );
}

export default Input;
