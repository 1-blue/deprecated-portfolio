import { useRef, useEffect, useCallback } from "react";

type Direction = "up" | "down" | "left" | "right";

type Props = {
  direction?: Direction;
  duration?: number;
  delay?: number;
};
type ReturnType = {
  ref: React.MutableRefObject<any>;
  style: {
    opacity: number;
    transform: string | undefined;
  };
};

const useScrollFadeIn = ({
  direction = "up",
  duration = 1,
  delay = 0,
}: Props): ReturnType => {
  // 2022/06/14 - 애니메이션을 실행할 태그Ref - by 1-blue
  const elementRef = useRef<HTMLElement | null>(null);

  // 2022/06/14 - 지정한 방향에 따른 트랜지션 반환 - by 1-blue
  const handleDirection = useCallback((dir: Direction) => {
    switch (dir) {
      case "up":
        return "translate3d(0, 50%, 0)";
      case "down":
        return "translate3d(0, -50%, 0)";
      case "left":
        return "translate3d(50%, 0, 0)";
      case "right":
        return "translate3d(-50%, 0, 0)";
      default:
        return "";
    }
  }, []);

  // 2022/06/14 - IntersectionObserver에 등록할 콜백함수 - by 1-blue
  const onScroll = useCallback(
    ([{ isIntersecting }]: IntersectionObserverEntry[]) => {
      const { current } = elementRef;
      if (!current) return;

      // 지정한 엘리먼트가 "threshold"만큼을 제외하고 뷰포트에 들어왔다면 실행
      if (isIntersecting) {
        current.style.transitionProperty = "all";
        current.style.transitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
        current.style.transitionDelay = `${delay}s`;
        current.style.opacity = "1";
        current.style.transform = "translate3d(0, 0, 0)";
      }
      // 지정한 엘리먼트가 "threshold"만큼을 제외하고 뷰포트 밖에 존재한다면 실행
      else {
        current.style.transitionProperty = "all";
        current.style.transitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = "cubic-bezier(0, 0, 0.2, 1)";
        current.style.transitionDelay = `${delay}s`;
        current.style.opacity = "0";
        current.style.transform = handleDirection(direction);
      }
    },
    [delay, duration, handleDirection, direction]
  );

  // 2022/06/14 - IntersectionObserver 등록 - by 1-blue
  useEffect(() => {
    if (!elementRef.current) return;

    // 0.1로 지정한 이유는 50% 이동 시 조금이라도 영역밖으로 나가면 애니메이션이 발동안하기 때문
    let observer = new IntersectionObserver(onScroll, { threshold: 0.1 });
    observer.observe(elementRef.current);

    return () => observer?.disconnect();
  }, [onScroll]);

  return {
    ref: elementRef,
    style: { opacity: 0, transform: handleDirection(direction) },
  };
};

export default useScrollFadeIn;
