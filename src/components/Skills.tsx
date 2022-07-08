import { useCallback, useEffect, useRef, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkHtml from "remark-html";

// hooks
import useScrollFadeIn from "@src/hooks/useScrollFadeIn";

// util
import { setDetailsHeight } from "@src/libs/utils";

// common-component
import Button from "@src/components/common/Button";
import Icon from "@src/components/common/Icon";

// type
import { SkillsType } from "@src/types";
type Props = SkillsType;

const Skills = ({ skills, content }: Props) => {
  // 2022/06/27 - 전체 열지 닫을지 결정 - by 1-blue
  const [isOpen, setIsOpen] = useState<boolean>(true);
  // 2022/06/27 - 파싱된 마크다운이 들어갈 변수 - by 1-blue
  const [descriptions, setDescriptions] = useState<any[]>([]);
  // 2022/06/27 - markdown parsing - by 1-blue
  useEffect(() => {
    (async () => {
      const promiseArray = Object.keys(skills).map((skill) =>
        unified().use(remarkParse).use(remarkHtml).process(skills[skill])
      );
      setDescriptions((await Promise.all(promiseArray)).map((v) => v.value));
    })();
  }, [skills, setDescriptions]);

  // 2022/06/15 - details wrapper의 ref - by 1-blue
  const skillWapperRef = useRef<HTMLUListElement | null>(null);
  // 2022/06/15 - details에 애니메이션 등록 ( 스르륵 열림 ) - by 1-blue
  useEffect(() => {
    if (!skillWapperRef.current) return;
    if (descriptions.length === 0) return;

    setDetailsHeight(skillWapperRef.current);
  }, [skillWapperRef, descriptions]);
  // 2022/06/15 - details toggle - by 1-blue
  const onToggleSkills = useCallback(() => {
    if (!skillWapperRef.current) return;

    const details = skillWapperRef.current.querySelectorAll("details");
    details.forEach((detail) => (detail.open = isOpen));
    setIsOpen((prev) => !prev);
  }, [skillWapperRef, isOpen, setIsOpen]);

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
        <section
          className="skills"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <ul
          className="w-4/5 lg:w-1/2 mx-auto mt-4 space-y-4"
          ref={skillWapperRef}
        >
          {Object.entries(skills).map((v, i) => (
            <li key={v[0]}>
              <details className="group rounded-md cursor-pointer select-none">
                <summary className="p-4 bg-slate-300 group-open:bg-slate-700 group-open:text-white transition-colors">
                  <span className="font-bold text-lg">{v[0]}</span>
                </summary>
                <div
                  className="description"
                  dangerouslySetInnerHTML={{ __html: descriptions[i] }}
                />
              </details>
            </li>
          ))}
        </ul>
      </article>

      {isShowButton && (
        <Button
          type="button"
          onClick={onToggleSkills}
          className="right-28 bottom-8"
        >
          <Icon shape="list" className="w-8 h-8 text-white" />
        </Button>
      )}
    </>
  );
};

export default Skills;
