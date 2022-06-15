import { useCallback, useEffect, useRef, useState } from "react";

// hooks
import useScrollFadeIn from "@src/hooks/useScrollFadeIn";

// util
import { setDetailsHeight } from "@src/libs/utils";

// common-component
import Button from "@src/components/common/Button";
import Icon from "@src/components/common/Icon";

// type
import { DataType } from "@src/types";
type Props = Pick<DataType, "skills">;

const Skills = ({ skills }: Props) => {
  // 2022/06/15 - details wrapper의 ref - by 1-blue
  const skillWapperRef = useRef<HTMLUListElement | null>(null);
  // 2022/06/15 - details에 애니메이션 등록 ( 스르륵 열림 ) - by 1-blue
  useEffect(() => {
    if (!skillWapperRef.current) return;

    setDetailsHeight(skillWapperRef.current);
  }, [skillWapperRef]);
  // 2022/06/15 - details toggle - by 1-blue
  const onToggleSkills = useCallback(() => {
    if (!skillWapperRef.current) return;

    const details = skillWapperRef.current.querySelectorAll("details");
    details.forEach((detail) => (detail.open = !detail.open));
  }, [skillWapperRef]);

  // 2022/06/15 - skill wrapper가 뷰포트에 보여지면 버튼도 렌더링 - by 1-blue
  const [isShowButton, setIsShowButton] = useState(false);
  useEffect(() => {
    if (!skillWapperRef.current) return;

    let observer = new IntersectionObserver(
      ([{ isIntersecting }]) => setIsShowButton(isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(skillWapperRef.current);

    return () => observer?.disconnect();
  }, [skillWapperRef, setIsShowButton]);

  return (
    <>
      <article {...useScrollFadeIn({ direction: "right", duration: 1.6 })}>
        <h2 className="text-center font-bold text-6xl mt-20">Skill.</h2>

        <ul
          className="min-w-[500px] w-1/2 mx-auto mt-4 space-y-4"
          ref={skillWapperRef}
        >
          {Object.entries(skills).map((v) => (
            <li key={v[0]}>
              <details className="group rounded-md cursor-pointer select-none">
                <summary className="p-4 bg-slate-300 group-open:bg-slate-700 group-open:text-white transition-colors">
                  <span className="font-bold text-lg">{v[0]}</span>
                </summary>
                <p className="p-4 bg-slate-300">{v[1]}</p>
              </details>
            </li>
          ))}
        </ul>
      </article>

      {isShowButton && (
        <Button type="button" onClick={onToggleSkills}>
          <Icon shape="list" className="w-8 h-8 text-white" />
        </Button>
      )}
    </>
  );
};

export default Skills;
