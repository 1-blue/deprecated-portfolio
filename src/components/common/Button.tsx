type Props = {
  type: "button" | "submit" | "reset";
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ type, children, onClick }: Props) => {
  return (
    <button
      type={type}
      className="fixed bottom-8 right-8 bg-indigo-400 rounded-full p-4 animate-slide-bottom"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
