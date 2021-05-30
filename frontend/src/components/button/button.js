import buttonStyles from "./button.module.css";

function Button({ className, children, type, onClick, ...props }) {
  return (
    <button
      className={`${buttonStyles.button} ${className}`}
      type={type}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
