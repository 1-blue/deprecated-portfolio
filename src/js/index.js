import {
  getTimelineValue,
  setDetailsHeight,
  imageCarouselSetting,
  tocSetting,
  scrollProgressBarSetting,
  backgroundSetting,
  cardHeightSetting,
} from "./utils/index.js";
(() => {
  const $toc = document.querySelector("#toc");
  if (!($toc instanceof HTMLElement)) return;
  // 모든 "scene"을 찾고 타입 확정
  const scenes = [...document.querySelectorAll("#scene")].filter(
    (scene) => scene instanceof HTMLElement
  );
  // "scene0"의 "message"들
  const messagesOfScene0 = [
    ...document.querySelectorAll(".scene-a .message"),
  ].filter((message) => message instanceof HTMLElement);
  // 이미지 확대에 사용할 모달
  const $imgModal = document.querySelector(".img-modal");
  if (!($imgModal instanceof HTMLElement)) return;
  // 각 "scene"에 대한 정보
  const sceneInfos = [
    // 첫 번째 "scene"의 정보
    {
      type: "fixed",
      // 뷰포트 높이의 3배를 가짐
      heightNumber: 3,
    },
    // 두 번째 "scene"의 정보
    {
      type: "nomal",
      heightNumber: 1,
    },
    // 세 번째 "scene"의 정보
    {
      type: "nomal",
      heightNumber: 1,
    },
  ];
  // 각 "scene"의 "animation"에 대한 정보
  const animationInfos = [
    // 첫 번째 "scene"에서 실행할 애니메이션
    {
      // 애니메이션을 실행할 타겟
      messageA: {
        // "opacity"
        opacityIn: {
          // 시작/끝 위치
          range: { start: 0.1, end: 0.3 },
          // 시작/끝 값
          value: { start: 0, end: 1 },
        },
        opacityOut: {
          range: { start: 0.7, end: 1 },
          value: { start: 1, end: 0 },
        },
        // "translateY"
        translateYIn: {
          range: { start: 0.1, end: 0.3 },
          value: { start: 60, end: 0 },
        },
        translateYOut: {
          range: { start: 0.7, end: 1 },
          value: { start: 0, end: -60 },
        },
      },
      messageB: {
        opacityIn: {
          range: { start: 0.2, end: 0.4 },
          value: { start: 0, end: 1 },
        },
        opacityOut: {
          range: { start: 0.7, end: 1 },
          value: { start: 1, end: 0 },
        },
        translateYIn: {
          range: { start: 0.2, end: 0.4 },
          value: { start: 20, end: 0 },
        },
        translateYOut: {
          range: { start: 0.7, end: 1 },
          value: { start: 0, end: -20 },
        },
      },
      messageC: {
        opacityIn: {
          range: { start: 0.3, end: 0.5 },
          value: { start: 0, end: 1 },
        },
        opacityOut: {
          range: { start: 0.7, end: 1 },
          value: { start: 1, end: 0 },
        },
        translateYIn: {
          range: { start: 0.3, end: 0.5 },
          value: { start: 20, end: 0 },
        },
        translateYOut: {
          range: { start: 0.7, end: 1 },
          value: { start: 0, end: -20 },
        },
      },
    },
    {},
    {},
  ];
  // 현재 위치한 "scene"
  let currentScene = 0;
  let prevSceneHeight = 0;
  let isSkillsOpened = false;
  // 이미지 modal 동작을 위해 사용하는 변수
  let $imgWrapper = null;
  let $imgWindow = null;
  let removeEventFuntions = [];
  // 초기 세팅
  const init = () => {
    // 각 "scene"의 높이 설정하기
    sceneInfos.forEach((sceneInfo, i) => {
      if (sceneInfo.type === "nomal") return;
      scenes[i].style.height = innerHeight * sceneInfo.heightNumber + "px";
    });
    // 현재 위치한 "scene" 설정 ( 스크롤 움직이고 새로고침하는 경우를 위함 )
    for (let i = 0; i < scenes.length; i++) {
      prevSceneHeight += scenes[i].clientHeight;
      if (scrollY < prevSceneHeight) {
        currentScene = i;
        prevSceneHeight -= scenes[i].clientHeight;
        break;
      }
    }
    // scene2 의 "<details>"관련 세팅
    const $detailsList = [
      ...document.querySelectorAll(".scene-b details"),
    ].filter(($details) => $details instanceof HTMLDetailsElement);
    // "<details>"들에 트랜지션 설정
    setDetailsHeight($detailsList);
    const $detailsToggleBtn = document.querySelector(".skill-toggle-btn");
    // "details"의 등장과 버튼에 스크롤에 의한 애니메이션 지정
    if ($detailsToggleBtn instanceof HTMLElement) {
      // scene2에 대한 감시
      let observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // "<details>" 전부 열기 버튼 visible
            $detailsToggleBtn.style.display = "block";
            // "<details>" 애니메이션 실행
            $detailsList.forEach(($details, i) => {
              if (i % 2 === 0) {
                $details.style.animation = "bounce-in-right 1.5s forwards";
              } else {
                $details.style.animation = "bounce-in-left 1.5s forwards";
              }
            });
          } else {
            // "<details>" 전부 열기 버튼 unvisible
            $detailsToggleBtn.style.display = "none";
            // "<details>" 애니메이션 반대로 실행
            $detailsList.forEach(($details, i) => {
              if (i % 2 === 0) {
                $details.style.animation =
                  "bounce-in-left 1.5s forwards reverse";
              } else {
                $details.style.animation =
                  "bounce-in-right 1.5s forwards reverse";
              }
            });
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(scenes[1]);
      // "<details>" 전부 열기 버튼 클릭 이벤트 등록
      $detailsToggleBtn.addEventListener("click", (e) => {
        isSkillsOpened = !isSkillsOpened;
        const details = scenes[1].querySelectorAll("details");
        details.forEach((detail) => (detail.open = isSkillsOpened));
        if (e.target instanceof HTMLElement) {
          e.target.innerText = isSkillsOpened ? "닫기" : "열기";
        }
      });
    }
    // card의 높이 결정하기
    cardHeightSetting();
    // 카드 뒤집기 클릭 이벤트 / 이미지 확대 모달 이벤트 등록
    scenes[2].addEventListener("click", (e) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (e.target.closest(".img-dot-btn-container")) return;
      // 이미지 확대 모달 open
      if (e.target.classList.contains("img")) {
        $imgWindow = e.target.closest(".img-window");
        if (!($imgWindow instanceof HTMLElement)) return;
        $imgWrapper = $imgWindow.parentElement;
        $imgModal.insertAdjacentElement("afterbegin", $imgWindow);
        document.body.classList.add("show-modal");
        // 이미지 확대 모달에 "carousel" 기능 설정
        const functions = imageCarouselSetting($imgModal);
        // 이벤트 제거 함수들 등록
        if (functions) removeEventFuntions = functions;
        return;
      }
      const $card = e.target.closest(".card");
      if (!($card instanceof HTMLElement)) return;
      // "image caruosel" 설정하기
      if ($card.dataset.status !== "opened") {
        const $back = $card.querySelector(".back");
        if (!($back instanceof HTMLElement)) return;
        // "image caruosel" 설정 함수
        imageCarouselSetting($back);
        // 한번만 세팅하면 되기 때문에 설정
        $card.dataset.status = "opened";
      }
      // ".card" 뒤집기
      if ($card.style.transform.includes("180")) {
        $card.style.transform = `rotateY(0deg)`;
      } else {
        $card.style.transform = `rotateY(180deg)`;
      }
    });
    // 이미지 확대 모달 닫기 이벤트 등록
    $imgModal.addEventListener("click", () => {
      if (!($imgWrapper instanceof HTMLElement)) return;
      if (!($imgWindow instanceof HTMLElement)) return;
      document.body.classList.remove("show-modal");
      $imgWrapper.insertAdjacentElement("afterbegin", $imgWindow);
      [...$imgModal.children].forEach((v) => {
        if (!(v instanceof HTMLElement)) return;
        if (!v.classList.contains("img-dot-btn-container")) return;
        v.innerHTML = "";
      });
      removeEventFuntions.forEach((func) => func());
      removeEventFuntions = [];
    });
    // 카드 등장 애니메이션 등록
    const $cards = [...document.querySelectorAll(".card")].filter(
      ($card) => $card instanceof HTMLElement
    );
    $cards.forEach(($card) => {
      let observer = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            $card.style.opacity = "1";
          } else {
            $card.style.opacity = "0";
            $card.style.transform = `rotateY(0deg)`;
          }
        },
        { threshold: 0.4 }
      );
      observer.observe($card);
    });
  };
  // 현재 어느 "scene"인지 구하는 이벤트 함수 ( + "prevSceneHeight"도 구함 )
  const onScrollEvent = () => {
    prevSceneHeight = 0;
    // 이전 "scene"의 높이의 합
    for (let i = 0; i < currentScene; i++) {
      prevSceneHeight += scenes[i].clientHeight;
    }
    // 다음 "scene"으로 넘어가면 실행 ( 바뀌는 시점에 마지막 애니메이션이 적용 안되기 때문에 바뀌기전 마지막에 애니메이션 적용 )
    if (scrollY > prevSceneHeight + scenes[currentScene].clientHeight) {
      currentScene++;
      playAnimation();
    }
    if (scrollY < prevSceneHeight) {
      currentScene--;
      playAnimation();
    }
  };
  // 애니메이션 실행
  const playAnimation = () => {
    // 현재 "scene"의 정보들
    const scene = scenes[currentScene];
    // 애니메이션의 값을 계산할 때 필요한 현재 "scene"의 정보 ( 현재 "scene"에서 스크롤된 높이 크기 / 현재 "scene"의 전체 높이 / 현재 "scene"에서 스크롤된 높이의 비율 )
    const currentSceneScrollHeight = scrollY - prevSceneHeight;
    const currentSceneHeight = scene.clientHeight - innerHeight;
    const ratio = currentSceneScrollHeight / currentSceneHeight;
    // 값을 넣을 변수
    let opacity = 0;
    let translateY = 0;
    // 첫 번째 "scene"
    if (currentScene === 0) {
      const animationInfo = animationInfos[currentScene];
      // "messageA"의 "opacity" 애니메이션
      if (animationInfo.messageA.opacityIn.range.end > ratio) {
        opacity = getTimelineValue(
          Object.assign(Object.assign({}, animationInfo.messageA.opacityIn), {
            currentSceneScrollHeight,
            currentSceneHeight,
          })
        );
      } else {
        opacity = getTimelineValue(
          Object.assign(Object.assign({}, animationInfo.messageA.opacityOut), {
            currentSceneScrollHeight,
            currentSceneHeight,
          })
        );
      }
      messagesOfScene0[0].style.opacity = `${opacity}`;
      // "messageA"의 "translateY" 애니메이션
      if (animationInfo.messageA.translateYIn.range.end > ratio) {
        translateY = getTimelineValue(
          Object.assign(
            Object.assign({}, animationInfo.messageA.translateYIn),
            { currentSceneScrollHeight, currentSceneHeight }
          )
        );
      } else {
        translateY = getTimelineValue(
          Object.assign(
            Object.assign({}, animationInfo.messageA.translateYOut),
            { currentSceneScrollHeight, currentSceneHeight }
          )
        );
      }
      messagesOfScene0[0].style.transform = `translate3d(0, ${translateY}%, 0)`;
      // "messageB"의 "opacity" 애니메이션
      if (animationInfo.messageB.opacityIn.range.end > ratio) {
        opacity = getTimelineValue(
          Object.assign(Object.assign({}, animationInfo.messageB.opacityIn), {
            currentSceneScrollHeight,
            currentSceneHeight,
          })
        );
      } else {
        opacity = getTimelineValue(
          Object.assign(Object.assign({}, animationInfo.messageB.opacityOut), {
            currentSceneScrollHeight,
            currentSceneHeight,
          })
        );
      }
      messagesOfScene0[1].style.opacity = `${opacity}`;
      // "messageB"의 "translateY" 애니메이션
      if (animationInfo.messageB.translateYIn.range.end > ratio) {
        translateY = getTimelineValue(
          Object.assign(
            Object.assign({}, animationInfo.messageB.translateYIn),
            { currentSceneScrollHeight, currentSceneHeight }
          )
        );
      } else {
        translateY = getTimelineValue(
          Object.assign(
            Object.assign({}, animationInfo.messageB.translateYOut),
            { currentSceneScrollHeight, currentSceneHeight }
          )
        );
      }
      messagesOfScene0[1].style.transform = `translate3d(0, ${translateY}%, 0)`;
      // "messageC"의 "opacity" 애니메이션
      if (animationInfo.messageC.opacityIn.range.end > ratio) {
        opacity = getTimelineValue(
          Object.assign(Object.assign({}, animationInfo.messageC.opacityIn), {
            currentSceneScrollHeight,
            currentSceneHeight,
          })
        );
      } else {
        opacity = getTimelineValue(
          Object.assign(Object.assign({}, animationInfo.messageC.opacityOut), {
            currentSceneScrollHeight,
            currentSceneHeight,
          })
        );
      }
      messagesOfScene0[2].style.opacity = `${opacity}`;
      // "messageC"의 "translateY" 애니메이션
      if (animationInfo.messageC.translateYIn.range.end > ratio) {
        translateY = getTimelineValue(
          Object.assign(
            Object.assign({}, animationInfo.messageC.translateYIn),
            { currentSceneScrollHeight, currentSceneHeight }
          )
        );
      } else {
        translateY = getTimelineValue(
          Object.assign(
            Object.assign({}, animationInfo.messageC.translateYOut),
            { currentSceneScrollHeight, currentSceneHeight }
          )
        );
      }
      messagesOfScene0[2].style.transform = `translate3d(0, ${translateY}%, 0)`;
    } else if (currentScene === 1) {
    }
  };
  window.addEventListener("DOMContentLoaded", () => {
    init();
    backgroundSetting();
    tocSetting();
    scrollProgressBarSetting();
  });
  window.addEventListener("resize", () => {
    backgroundSetting();
    cardHeightSetting();
    if (innerWidth < 1200) $toc.style.display = "none";
    else $toc.style.display = "block";
  });
  window.addEventListener("scroll", () => {
    onScrollEvent();
    playAnimation();
    scrollProgressBarSetting();
  });
})();
