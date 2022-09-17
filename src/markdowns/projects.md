---
projects: [
  {
    name: "BleShop",
    skills: ["Next.js", "TypeScript", "TailwindCss", "next-auth", "recoil", "prisma", "AWS-EC2", "AWS-S3"],
    description: "지금까지 공부해봤던 라이브러리들 중에서 가장 편했던것을 고르고, 새롭게 시도할 것을 선택해 적용한 프로젝트입니다.\n\n프로젝트의 첫 번째 목적은 타입을 제대로 활용하는 것입니다. 다른 프로젝트를 만들다가 항상 느꼈던 부분이 가면 갈수록 타입이 꼬여서 수정이 너무 어려워지는 문제를 겪어왔습니다. 처음부터 타입을 제대로 지정하고 문제없이 동작하도록 코드를 구성했습니다.\n두 번째로는 결제 기능입니다. 뭔가 실제로 사용할 수 있는 프로젝트를 만들어보고 싶었습니다.\n마지막으로 버그 없는 프로젝트입니다. 여태까지 만들었던 모든 프로젝트는 작든 크든 배포만하면 항상 버그가 생겼는데 이번에는 모든 버그와 경고는 해결하고 문제 없이 동작하도록 만들었습니다.",
    thumbnails: [
      "https://bleshop.s3.ap-northeast-2.amazonaws.com/deployment/gif/payment.gif",
      "https://bleshop.s3.ap-northeast-2.amazonaws.com/deployment/gif/mobile_payment.gif",
      "https://bleshop.s3.ap-northeast-2.amazonaws.com/deployment/gif/infinite_scrolling.gif",
      "https://bleshop.s3.ap-northeast-2.amazonaws.com/deployment/gif/upload_photo.gif",
    ],
    links: {
      deploy: "https://bleshop.shop",
      github: "https://github.com/1-blue/bleshop",
      trello: "https://trello.com/b/LB5XaYBq/bleshop",
      velog: "https://velog.io/@1-blue/series/bleshop",
    },
    date: {
      start: 2022-08-08,
      end: 2022-09-17,
    },
    logoColor: "#FF0000"
  },
  {
    name: "Portfolio",
    skills: ["TypeScript", "Next.js", "TailwindCss", "Vercel"],
    description: "가볍게 Next.js에 TypeScript를 곁들여서 만든 프로젝트입니다.\nCSS는 TailwindCss를 이용했고, 배포는 Versel을 이용해서 간단하게 처리했습니다.\n\n[`<details>`에 ResizeObserver를 이용해서 스킬을 구현](https://velog.io/@1-blue/%EC%83%81%EC%84%B8-%EB%82%B4%EC%9A%A9-%EB%B3%B4%EA%B8%B0-details-summary)했고, IntersectionObserver을 이용해서 [스크롤 애니메이션](https://velog.io/@1-blue/%EC%8A%A4%ED%81%AC%EB%A1%A4%EC%97%90-%EC%9D%98%ED%95%9C-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98)과 [TOC](https://velog.io/@1-blue/%EB%AA%A9%EC%B0%A8-%EC%8A%A4%ED%81%AC%EB%A1%A4-TOC)를 구현했으며, 모든 데이터들은 정적인 markdown파일로 따로 관리하며 빌드 시 파일을 읽어서 내용을 채우도록 [데이터와 동작 로직을 분리](https://velog.io/@1-blue/%EC%A0%95%EC%A0%81-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EA%B4%80%EB%A6%AC-%EB%B0%8F-%EB%A7%88%ED%81%AC%EB%8B%A4%EC%9A%B4-%ED%8C%8C%EC%8B%B1)했습니다.",
    thumbnails: [
      "https://user-images.githubusercontent.com/63289318/177724435-f7c538ee-e3ca-4fc8-b16f-193eae8c01de.gif",
      "https://user-images.githubusercontent.com/63289318/177724446-c924d0c1-7a80-40cd-8f81-9159af19a21b.gif",
      "https://user-images.githubusercontent.com/63289318/177724441-d7da8c39-e33c-44ca-a6d6-37c919c31c26.gif",
      "https://user-images.githubusercontent.com/63289318/177724454-a59d8482-41aa-4334-b39c-8a7de772c560.gif",
    ],
    links: {
      deploy: "https://bleportfolio.vercel.app",
      github: "https://github.com/1-blue/portfolio",
      trello: "https://trello.com/b/xydemYIK/portfolio",
      velog: "https://velog.io/@1-blue/series/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4",
    },
    date: {
      start: 2022-06-13,
      end: 2022-07-07,
    },
    logoColor: "#6069F1"
  },
  {
    name: "Blelog",
    skills: ["TypeScript", "Next.js", "SWR", "TailwindCss", "Vercel"],
    description: "3인 개발으로 개발자 전용 블로그인 Velog를 클론 코딩한 프로젝트입니다.\n현재 사용하고 있는 서비스를 따라 만들면서 많은 경험을 하고 미래에 만들어볼 개인 블로그를 위해서 선택하게 되었습니다.\n\n처음으로 프론트엔드 영역만 맡아서 개발을 진행했으며, API문서를 만들어서 어떤 API로 어떤 데이터를 첨부해서 요청하면 어떤 데이터를 받을지 미리 정해두고 개발을 진행했습니다.\n구현 기능으로는 테마, 카테고리별 게시글 분류, 태그 기반 게시글 검색, 마크다운 미리보기, 게시글 임시 저장 등의 기능을 구현했습니다.\n\n> 아직 미완성 상태이므로 배포하지 않았습니다.",
    thumbnails: [
      "https://user-images.githubusercontent.com/63289318/172105425-4ef03677-cd95-44d1-a0bc-8a094bd94e02.gif",
      "https://user-images.githubusercontent.com/63289318/172105445-33dd6b29-6357-4b36-b069-35e880ec7ea9.gif",
      "https://user-images.githubusercontent.com/63289318/172105441-20f8e01a-b0a4-4bf6-9828-b1affc724481.gif",
      "https://user-images.githubusercontent.com/63289318/172105446-e3e418df-8241-42fd-a541-44ff6a2c2648.gif",
      "https://user-images.githubusercontent.com/63289318/172105440-d2ad1c18-e07b-4075-9617-ad846ce56391.gif",
      "https://user-images.githubusercontent.com/63289318/172105453-d0dbedab-18a6-4625-bfc9-5066affebfe1.gif",
      "https://user-images.githubusercontent.com/63289318/172105456-0ee53363-c238-48c9-93e6-ca916e1c7a13.gif",
      "https://user-images.githubusercontent.com/63289318/172105435-9d2d48db-bf05-489c-9960-44500b4391e9.gif",
    ],
    links: {
      deploy: "",
      github: "https://github.com/1-blue/capstone-design-2022-front",
      trello: "https://trello.com/b/T98vIu6a/capstonedesign-2022",
      velog: "https://velog.io/@1-blue/series/capstonedesign-2022-JsLog",
    },
    date: {
      start: 2022-04-10,
      end: 2022-06-08,
    },
    logoColor: "#63E6BE"
  },
  {
    name: "Blemarket",
    skills: ["TypeScript", "Next.js", "SWR", "TailwindCss", "Prisma", "PlanetScale", "Socket.io", "AWS-S3", "Vercel"],
    description: "1인 개발으로 노마드 코더의 캐럿 마켓 클론 코딩을 베이스로 시작한 프로젝트입니다.\n강의에서 Next.js + Typescript와 SWR, Prisma, planet-scale, versel에 대해서 배울 수 있었습니다.\n\n만들어보면서 Redux나 Recoil같은 상태 관리 라이브러리를 필수적으로 사용할 필요 없이 SWR같은 데이터 패칭 라이브러리로 대체할 수 있다는 점을 배웠습니다. 또한 serverless로 애플리케이션을 배포하는 법, TypeScript와 TailwindCss의 유용함에 대해서 알게 되었습니다.\n\n강의에서 구현해주는 유저, 상품, 게시글, 댓글, 좋아요 CURD외에도 페이지네이션, 1 : 1 채팅, 키워드 기반 상품 검색, 상품 상태 ( 판매중, 예약중, 판매완료 ) 등의 기능을 추가적으로 구현했습니다.\n\n> 정확한 원인은 모르지만 현재 vercel로 배포한 상태에서 서버의 응답이 매우 느립니다.",
    thumbnails: [
      "https://user-images.githubusercontent.com/63289318/165018145-3785b1d1-d72d-46ec-8490-894abae7e004.gif",
      "https://user-images.githubusercontent.com/63289318/165023971-92f33af2-f1f9-4d1f-890b-94fe4b1e562c.gif",
      "https://user-images.githubusercontent.com/63289318/165023955-dca04bba-d69a-41fb-ab58-27059bc4dd7d.gif",
      "https://user-images.githubusercontent.com/63289318/165023961-ac84e8df-85b1-483d-b0c7-77c911ee7ffc.gif",
    ],
    links: {
      deploy: "https://blemarket.vercel.app",
      github: "https://github.com/1-blue/blemarket",
      trello: "https://trello.com/b/AT4Z2NOe/blemarket",
      velog: "https://velog.io/@1-blue/series/blemarket",
    },
    date: {
      start: 2022-03-09,
      end: 2022-04-25,
    },
    logoColor: "#FF9933"
  },
  {
    name: "Blegram",
    skills: ["TypeScript", "Next.js", "Redux-Toolkit", "Redux-Saga", "styled-components", "Express", "Sequelize", "Passport", "Socket.io", "AWS-EC2", "AWS-S3", "Nginx"],
    description: "1인 개발으로 많은 사람이 사용하는 웹 서비스인 인스타그램을 클론한 서비스입니다.\n많은 기능이 내장되어 있어서 원하는 기능들을 하나씩 추가해볼 수 있으므로 선택했습니다.\n\n1인 개발로 프론트는 SEO를 위해서 Next.js를 선택했고, 백엔드는 Node.js, 데이터베이스는 Mysql, 배포는 AWS-EC2, 정적 이미지 처리는 AWS-S3를 선택했습니다.\n처음으로 프론트 엔드, 백엔드, 데이터베이스, 배포까지 경험해봄으로써 SEO, 프론트엔드와 백엔드의 관계, 배포 시 겪을 수 있는 문제들을 충분히 경험하고 받아들일 수 있는 프로젝트였습니다.\n또한 Redux-Toolkit과 Redux-Saga의 Flux패턴을 이용한 상태관리에 대한 경험을 충분히 할 수 있었습니다. \n그리고 v1.0.0에서는 React.js 사용, v2.0.0에서는 Next.js로 변경, v3.0.0에서는 TypeScript 적용, 이후에 Redux-Toolkit으로 변경해봄으로써 어떤 식으로 코드를 구성할지에 대해 생각을 많이 해본 프로젝트입니다.\n\n> 한 달에 15일 이상 요금이 청구되기 때문에 매달 1~15일만 사이트가 열려 있을 수 도 있습니다.",
    thumbnails: [
      "https://user-images.githubusercontent.com/63289318/172258740-bdc93fc5-05be-4831-888d-a5c32eb823fb.gif",
      "https://user-images.githubusercontent.com/63289318/172258719-5ee3176c-f447-4ac3-946b-00aee979e0a3.gif",
      "https://user-images.githubusercontent.com/63289318/172258727-86f76f73-e4d2-400a-9f07-58e7f47db586.gif",
      "https://user-images.githubusercontent.com/63289318/172258733-1b63207f-4937-4eb2-9a5d-81f1cdb3e226.gif",
      "https://user-images.githubusercontent.com/63289318/172258726-092bbe88-3969-49cf-a118-9d8456122b2c.gif",
      "https://user-images.githubusercontent.com/63289318/172258747-53ea1155-2708-49cd-8f73-37a1f5e0817b.gif",
      "https://user-images.githubusercontent.com/63289318/172258753-f614fbd3-5035-4773-9609-8de3a66ea105.gif",
    ],
    links: {
      deploy: "https://blegram.com",
      github: "https://github.com/1-blue/blegram",
      trello: "https://trello.com/b/jBz14zzw/bluegram",
      velog: "https://velog.io/@1-blue/series/bluegram",
    },
    date: {
      start: 2021-12-13,
      end: 2022-01-29,
    },
    logoColor: "#6069F1"
  }
]
---

# 🐲 Projects 🐲