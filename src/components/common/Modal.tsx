import React, { useCallback, useEffect, useRef } from "react";

// util
import { combineClassNames } from "@src/libs/utils";

type Props = {
  children: React.ReactNode;
  onCloseModal: () => void;
  title?: string;
  className?: string;
};

const Modal = ({ children, onCloseModal, title, className }: Props) => {
  const modalRef = useRef<null | HTMLElement>(null);

  const closeModal = useCallback(
    (e: any) => {
      if (modalRef.current === e.target) onCloseModal();
    },
    [modalRef, onCloseModal]
  );

  // 2022/09/17 - 영역 외 클릭시 메뉴 닫는 이벤트 등록 - by 1-blue
  useEffect(() => {
    window.addEventListener("click", closeModal);

    return () => window.removeEventListener("click", closeModal);
  }, [closeModal]);

  // 2022/09/17 - 모달 열려있으면 외부 스크롤 금지 - by 1-blue
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      return;
    };
  }, []);

  return (
    <aside
      className="fixed top-0 left-0 bg-black/60 w-full h-full z-10 animate-fade-in"
      ref={modalRef}
      style={{ margin: 0 }}
    >
      <aside
        className={combineClassNames(
          "absolute top-1/2 left-1/2 w-2/3 rounded-md -translate-x-1/2 -translate-y-1/2",
          className ? className : ""
        )}
      >
        {title && (
          <h3 className="text-base sm:text-xl md:text-2xl text-center text-white font-bolder py-2 xs:py-3 bg-blue-400">
            {title}
          </h3>
        )}

        {children}
      </aside>
    </aside>
  );
};

export default Modal;
