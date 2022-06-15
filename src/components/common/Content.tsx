// util
import { combineClassNames } from "@src/libs/utils";

type Props = {
  content: string;
  delay: number;
};

const Content = ({ content, delay }: Props) => {
  return (
    <h2
      className={combineClassNames(
        "z-0 text-white text-2xl whitespace-pre-line mx-[10vw] opacity-0",
        (delay - 2.2) % 2 === 0 ? "animate-slide-left" : "animate-slide-right"
      )}
      style={{
        animationDelay: delay + "s",
      }}
    >
      {content}
    </h2>
  );
};

export default Content;
