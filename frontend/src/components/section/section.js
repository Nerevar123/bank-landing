import cn from "classnames";
import sectionStyles from "./section.module.css";

function Section({ className, title, children }) {
  return (
    <section className={cn(sectionStyles.section, className)}>
      <h1 className={sectionStyles.title}>{title}</h1>
      {children}
    </section>
  );
}

export default Section;
