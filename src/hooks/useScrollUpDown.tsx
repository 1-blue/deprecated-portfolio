import { useEffect, useState } from "react";

// util
import { throttleHelper } from "@src/libs/utils";

const useScrollUpDown = (): { hide: boolean; pageY: number } => {
  // 2022/06/17 - 헤더 숨김 여부 변수 - by 1-blue
  const [hide, setHide] = useState(false);
  // 2022/06/17 - 현재 스크롤 위치값 저장할 변수 - by 1-blue
  const [pageY, setPageY] = useState(0);
  // 2022/06/17 - 현재 스크롤을 내렸는지 올렸는지 확인할 스크롤 이벤트 함수 - by 1-blue
  const handleScroll = () => {
    const { pageYOffset } = window;
    const deltaY = pageYOffset - pageY;
    const hide = pageYOffset !== 0 && deltaY >= 0;
    setHide(hide);
    setPageY(pageYOffset);
  };
  // 2022/06/17 - 스크롤 이벤트에 스로틀링 적용 - by 1-blue
  const throttleScroll = throttleHelper(handleScroll, 50);
  // 2022/06/17 - 스크롤 이벤트 등록 - by 1-blue
  useEffect(() => {
    document.addEventListener("scroll", throttleScroll);
    return () => document.removeEventListener("scroll", throttleScroll);
  }, [throttleScroll]);

  return { hide, pageY };
};

export default useScrollUpDown;
