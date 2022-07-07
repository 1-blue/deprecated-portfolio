import { useCallback, useEffect, useState } from "react";

type Size = { width: number; height: number };

const useResize = (): Size => {
  const [size, setSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  const handleRedize = useCallback(
    () => setSize({ width: window.innerWidth, height: window.innerHeight }),
    [setSize]
  );
  useEffect(() => {
    window.addEventListener("resize", handleRedize);

    return () => window.removeEventListener("resize", handleRedize);
  }, [handleRedize]);

  // 초기화
  useEffect(() => handleRedize(), [handleRedize]);

  return size;
};

export default useResize;
