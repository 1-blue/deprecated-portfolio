import Image from "next/image";

// util
import { combineClassNames } from "@src/libs/utils";

type Props = {
  photo?: string | null;
  className?: string;
  $cover?: boolean;
  $contain?: boolean;
  $priority?: boolean;
};

const Photo = ({ photo, className, $cover, $contain, $priority }: Props) => {
  return (
    <>
      {photo ? (
        <figure
          className={combineClassNames(
            "relative bg-stone-800",
            className ? className : ""
          )}
        >
          <Image
            src={photo}
            layout="fill"
            className={combineClassNames(
              "",
              $cover ? "object-cover" : "",
              $contain ? "object-contain" : ""
            )}
            alt="이미지"
            priority={$priority}
          />
        </figure>
      ) : (
        <figure
          className={combineClassNames(
            "bg-slate-400",
            className ? className : ""
          )}
        />
      )}
    </>
  );
};

export default Photo;
