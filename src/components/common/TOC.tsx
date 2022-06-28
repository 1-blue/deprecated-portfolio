import { useEffect, useState } from "react";

// util
import { combineClassNames } from "@src/libs/utils";

const TOC = () => {
  // 목차 리스트
  const [indexList, setIndexList] = useState<{ index: string; size: number }[]>(
    []
  );
  // 현재 보이는 목차
  const [currentIndex, setCurrentIndex] = useState<string>("");

  useEffect(() => {
    // <h1>, <h2>, <h3> 찾기
    const hNodeList = document
      .querySelector("main")
      ?.querySelectorAll("h1, h2, h3") as NodeListOf<Element>;

    // IntersectionObserver들이 들어갈 배열 ( 이벤트 해제를 위해 )
    const IOList: IntersectionObserver[] = [];
    let IO: IntersectionObserver;

    [...hNodeList].forEach((node) => {
      // 목차 내용이랑 사이즈 구해서 저장
      const index = node.textContent as string;
      const size = (+node.nodeName[1] - 1) * 20;
      setIndexList((prev) => {
        if (prev.map((v) => v.index).includes(index)) return prev;
        return [...prev, { index, size }];
      });

      // 각 <h*>에 id로 현재 컨텐츠 내용 추가
      node.id = index;

      // 화면에 보이면 강조되도록 "IntersectionObserver" 등록
      IO = new IntersectionObserver(
        ([
          {
            isIntersecting,
            target: { textContent },
          },
        ]) => {
          if (!isIntersecting) return;
          setCurrentIndex(textContent!);
        },
        { threshold: 0.5 }
      );
      IO.observe(node);

      // 이벤트 해제를 위해 등록
      IOList.push(IO);
    });

    // 이벤트 해제
    return () => IOList.forEach((IO) => IO.disconnect());
  }, []);

  return (
    <aside className="fixed top-10 right-10 border-l-4 border-indigo-400 px-4 py-2 bg-white z-10">
      <ul>
        {indexList.map(({ index, size }) => (
          <li
            key={index}
            style={{
              paddingLeft: size + "px",
              fontSize: 17 - size / 12 + "px",
            }}
            className={combineClassNames(
              "transition-all hover:text-blue-600",
              currentIndex === index ? "text-indigo-400 scale-105" : ""
            )}
          >
            <a href={`/#${index}`}>{index}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default TOC;
