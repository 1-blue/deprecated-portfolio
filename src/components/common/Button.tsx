// util
import { combineClassNames } from "@src/libs/utils";

type Props = {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
};

const Button = ({ type, children, onClick, className }: Props) => {
  return (
    <button
      type={type}
      className={combineClassNames(
        "fixed bg-indigo-400 rounded-full p-4 shadow-xl animate-slide-bottom",
        className ? className : ""
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
