import cn from "classnames";
import buttonsStyles from "./buttons-container.module.css";

function Buttons({ className, children }) {
  return <div className={cn(buttonsStyles.buttons, className)}>{children}</div>;
}

export default Buttons;
