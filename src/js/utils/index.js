/**
 * "details"에 트랜지션을 지정하기 위한 세팅 함수
 * @$detailsList 트랜지션을 지정할 "details"들의 공통된 부모 엘리먼트
 */
export const setDetailsHeight = ($detailsList) => {
    const setHeight = (detail, open = false) => {
        detail.open = open;
        const { width, height } = detail.getBoundingClientRect();
        detail.dataset.width = width + "";
        detail.style.setProperty(open ? `--expanded` : `--collapsed`, `${height}px`);
    };
    const RO = new ResizeObserver((entries) => entries.forEach((entry) => {
        const detail = entry.target;
        const width = detail.dataset.width ? +detail.dataset.width : -1;
        if (width !== entry.contentRect.width) {
            detail.removeAttribute("style");
            setHeight(detail);
            setHeight(detail, true);
            detail.open = false;
        }
    }));
    $detailsList.forEach((details) => RO.observe(details));
};
/**
 * 현재 애니메이션이 실행될 비율 구하기
 * @range 애니메이션 실행 스크롤의 범위 ( 0 ~ 1 )
 * @value 애니메이션 실행 값의 범위
 * @currentSceneScrollHeight 현재 "scene"에서 스크롤한 크기
 * @currentSceneHeight 현재 "scene"의 전체 높이
 * @returns 현재 애니메이션 실행 값
 */
export const getTimelineValue = ({ range, value, currentSceneScrollHeight, currentSceneHeight, }) => {
    // 애니메이션 시작지점/끝지점/지속영역
    const animationStartHeight = currentSceneHeight * range.start;
    const animationEndHeight = currentSceneHeight * range.end;
    const animationHeight = animationEndHeight - animationStartHeight;
    // 애니메이션 실행 영역에 들어온 경우
    if (animationStartHeight <= currentSceneScrollHeight &&
        animationEndHeight >= currentSceneScrollHeight) {
        return (((currentSceneScrollHeight - animationStartHeight) / animationHeight) *
            (value.end - value.start) +
            value.start);
    }
    // 애니메이션 실행 영역 이전인 경우
    else if (animationStartHeight > currentSceneScrollHeight) {
        return value.start;
    }
    // 애니메이션 실행 영역 이후인 경우
    else {
        return value.end;
    }
};
/**
 * "image-carousel"을 위한 설정
 * @param $imgWrapper 이미지들을 가진 컨테이너 엘리먼트 ( ".img-window > .img-container > .img"를 모두 가진 엘리먼트 )
 * @returns "image-carousel"의 이벤트 제거 함수 2개 ( 배열 )
 */
export const imageCarouselSetting = ($imgWrapper) => {
    // 이미지들을 가진 이미지 컨테이너
    const $imgContainer = $imgWrapper.querySelector(".img-container");
    if (!($imgContainer instanceof HTMLElement))
        return;
    // 이미지 이동 버튼 컨테이너 ( 이벤트 버블링을 사용하기 때문에 버튼을 선택할 필요 없음 ( + "dataset" ) )
    const $buttonContainer = $imgWrapper.querySelector(".img-btn-container");
    if (!($buttonContainer instanceof HTMLElement))
        return;
    // 이미지 dot 버튼 컨테이너
    const $dotButtonContainer = $imgWrapper.querySelector(".img-dot-btn-container");
    if (!($dotButtonContainer instanceof HTMLElement))
        return;
    // 이미지 컨테이너 내부의 이미지들
    const $imgs = [...$imgContainer.childNodes].filter(($img) => $img instanceof HTMLElement);
    // 이미지 개수 / 이동 거리
    const imgCount = $imgs.length;
    const rDistance = (100 / imgCount) * -2;
    const lDistance = 0;
    let direction = 0;
    let isExcuteTransitionEnd = false;
    let isExcute = false;
    let dotBtns = [];
    let currentTaget = 0;
    // 이미지 컨테이너의 "width"를 "이미지 개수 * 100%"로 계산해서 모든 이미지가 가로로 배치되도록 만듦
    $imgContainer.style.width = `${100 * imgCount}%`;
    // 첫 번째 이미지를 2번째 위치로 옮겨서 2번째 위치부터 보여주도록 지정 ( 시작부터 좌측으로 이동하는 경우를 대비 )
    $imgContainer.insertBefore($imgContainer.lastElementChild, $imgContainer.firstElementChild);
    $imgContainer.style.transition = `all 0s`;
    $imgContainer.style.transform = `translateX(-${100 / imgCount}%)`;
    // 이미지 이동 버튼 클릭 ( by 이벤트 버블링 )
    const imgMoveBtnClickEvent = (e) => {
        e.stopPropagation();
        if (isExcute)
            return;
        if (!(e.target instanceof HTMLButtonElement))
            return;
        // 미리 저장해둔 "dataset"을 이용해서 어떤 방향인지 추출
        direction = Number(e.target.dataset.direction);
        // 해당 방향으로 1칸 이동
        isExcuteTransitionEnd = true;
        isExcute = true;
        $imgContainer.style.transition = `all 1s`;
        $imgContainer.style.transform = `translateX(${direction === -1 ? rDistance : lDistance}%)`;
        // 현재 이미지 동기화
        currentTaget += direction === -1 ? 1 : -1;
        if (currentTaget >= imgCount)
            currentTaget = 0;
        else if (currentTaget < 0)
            currentTaget = imgCount - 1;
        dotBtns.forEach((dotBtn) => (dotBtn.dataset.target = "false"));
        dotBtns[currentTaget].dataset.target = "true";
    };
    // 트랜지션이 끝나면 이미지 순서 변경 ( 아래 동작을 하는 이유는 무한으로 좌/우측으로 움직이기 위함 )
    const imgTransitionEndEvent = () => {
        if (!isExcuteTransitionEnd)
            return;
        if (!($imgContainer.firstElementChild instanceof HTMLElement))
            return;
        if (!($imgContainer.lastElementChild instanceof HTMLElement))
            return;
        isExcuteTransitionEnd = false;
        $imgContainer.style.transition = `all 0s`;
        $imgContainer.style.transform = `translateX(-${100 / imgCount}%)`;
        // 기존 노드는 자동으로 삭제됨 이동만 하면 됨
        // 역방향
        if (direction === 1) {
            $imgContainer.insertBefore($imgContainer.lastElementChild, $imgContainer.firstElementChild);
        }
        // 정방향
        else {
            $imgContainer.appendChild($imgContainer.firstElementChild);
        }
        isExcute = false;
    };
    // 이미지 dot 버튼 클릭 시 해당 이미지로 이동
    const imgDotBtnClickEvent = (e) => {
        if (!(e.target instanceof HTMLElement))
            return;
        // currentTaget = +(e.target.dataset.number || 0);
        // dotBtns.forEach((dotBtn) => (dotBtn.dataset.target = "false"));
        // dotBtns[currentTaget].dataset.target = "true";
        // >>> dot 클릭 시 이미지 이동 구현은 여기부터 ( 지금은 좋은 생각이 없어서 구현 X )
    };
    // 이미지 개수만큼 "dot" 추가
    for (let i = 0; i < imgCount; i++) {
        const $$dotButton = document.createElement("button");
        $$dotButton.type = "button";
        $$dotButton.classList.add("dot");
        $$dotButton.dataset.number = `${i}`;
        $dotButtonContainer.append($$dotButton);
        dotBtns.push($$dotButton);
    }
    dotBtns[currentTaget].dataset.target = "true";
    // 이벤트 등록
    $buttonContainer.addEventListener("click", imgMoveBtnClickEvent);
    $imgContainer.addEventListener("transitionend", imgTransitionEndEvent);
    $dotButtonContainer.addEventListener("click", imgDotBtnClickEvent);
    // 이벤트 제거 함수 반환
    return [
        () => $buttonContainer.removeEventListener("click", imgMoveBtnClickEvent),
        () => $buttonContainer.removeEventListener("transitionend", imgTransitionEndEvent),
        () => $dotButtonContainer.removeEventListener("click", imgDotBtnClickEvent),
    ];
};
/**
 * toc ( table of contents )
 * 목차 스크롤
 */
export const tocSetting = () => {
    const $allTitles = [
        ...document.querySelectorAll("h1, h2, h3, h4, h5, h6"),
    ].filter(($title) => $title instanceof HTMLElement);
    // 각 타이들에 "id" 지정 ( "href"로 찾아가기 위함 )
    $allTitles.forEach(($title) => ($title.id = $title.innerText));
    const $$ul = document.createElement("ul");
    const $$anchors = [];
    // 목차 생성
    $allTitles.forEach(($title) => {
        const $$a = document.createElement("a");
        const $$li = document.createElement("li");
        $$a.href = `#${$title.innerText}`;
        $$a.innerText = `${$title.innerText}`;
        $$a.dataset.type = $title.nodeName;
        $$li.appendChild($$a);
        $$ul.appendChild($$li);
        $$anchors.push($$a);
    });
    const $toc = document.querySelector("#toc");
    if (!($toc instanceof HTMLElement))
        return;
    if (innerWidth < 1200)
        $toc.style.display = "none";
    else
        $toc.style.display = "block";
    $toc.appendChild($$ul);
    // 이전 Y 높이
    let prevPositonY = 0;
    // 현재 위치를 강조하기 위함
    $allTitles.forEach(($title, i) => {
        let observer = new IntersectionObserver(([{ isIntersecting }]) => {
            // 상->하: false, 하->상: true
            const direction = prevPositonY - scrollY > 0;
            if ((!direction && !isIntersecting) || (direction && isIntersecting)) {
                $$anchors.forEach(($$anchor) => $$anchor.classList.remove("activate"));
                $$anchors[i].classList.add("activate");
            }
            prevPositonY = scrollY;
        }, { threshold: 1 });
        observer.observe($title);
    });
    setTimeout(() => {
        $$anchors.forEach(($$anchor) => $$anchor.classList.remove("activate"));
        $$anchors[0].classList.add("activate");
    }, 100);
};
/**
 * scroll progress bar
 */
export const scrollProgressBarSetting = () => {
    const $scrollProgressBar = document.querySelector("#scroll-progressbar");
    if (!($scrollProgressBar instanceof HTMLElement))
        return;
    const scrollHeight = document.body.scrollHeight - innerHeight;
    $scrollProgressBar.style.width = `${(scrollY / scrollHeight) * 100}%`;
};
