export const combineClassNames = (...classname: string[]) =>
  classname.join(" ");

export const setDetailsHeight = (wrapper: HTMLElement) => {
  const setHeight = (detail: HTMLDetailsElement, open = false) => {
    detail.open = open;
    const { width, height } = detail.getBoundingClientRect();
    detail.dataset.width = width + "";
    detail.style.setProperty(
      open ? `--expanded` : `--collapsed`,
      `${height}px`
    );
  };

  const RO = new ResizeObserver((entries) =>
    entries.forEach((entry) => {
      const detail = entry.target as HTMLDetailsElement;
      const width = detail.dataset.width ? +detail.dataset.width : -1;

      if (width !== entry.contentRect.width) {
        detail.removeAttribute("style");
        setHeight(detail);
        setHeight(detail, true);
        detail.open = false;
      }
    })
  );

  const details = wrapper.querySelectorAll("details");
  details.forEach((detail) => RO.observe(detail));
};

// 2022/06/17 - 스로틀 헬퍼 함수 - by 1-blue
export const throttleHelper = (callback: () => void, waitTime: number) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timerId) return;
    timerId = setTimeout(() => {
      callback();
      timerId = null;
    }, waitTime);
  };
};
