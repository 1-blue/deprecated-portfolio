import { useEffect, useState } from "react";

// common-component
import Icon from "@src/components/common/Icon";
import CustomLink from "@src/components/common/CustomLink";

// util
import { dateOrTimeFormat } from "@src/libs/dateFormat";

// type
import { CoverType } from "@src/types";
type Props = CoverType;

const Cover = ({ updatedAt, email, phone, content }: Props) => {
  const [delayTime, setDelayTime] = useState<number>(0);

  // 2022/06/27 - 애니메이션 딜레이 시간 구하기 ( +2 하는 이유는 기본 딜레이(+1)와 마지막 애니메이션 후 지연시간(+1) 때문 )
  useEffect(() => {
    setDelayTime((content.match(/<p>/g)?.length || 0) + 2);
  }, [content, setDelayTime]);

  return (
    <article className="relative bg-me h-screen bg-cover bg-center bg-no-repeat bg-fixed flex flex-col justify-center items-center">
      {/* opacity background */}
      <aside className="absolute w-full h-screen bg-black opacity-60" />

      {/* 타이틀과 자기소개 */}
      <section
        className="cover z-0"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* 깃헙, 벨로그, 트렐로 */}
      <section
        className="z-0 animate-slide-bottom opacity-0"
        style={{
          animationDelay: delayTime + "s",
        }}
      >
        <h4 className="text-white font-bold text-3xl mt-6 mb-4 text-center">
          Contect.
        </h4>
        <ul className="flex space-x-16">
          <CustomLink href="https://github.com/1-blue">
            <Icon shape="github" />
          </CustomLink>
          <CustomLink href="https://velog.io/@1-blue">
            <Icon shape="velog" />
          </CustomLink>
          <CustomLink href="https://trello.com/user81374892/boards">
            <Icon shape="trello" />
          </CustomLink>
        </ul>
      </section>

      {/* 이메일, 휴대폰번호 */}
      <section
        className="z-0 animate-slide-bottom opacity-0"
        style={{
          animationDelay: delayTime + 1 + "s",
        }}
      >
        <h4 className="text-white font-bold text-3xl mt-6 mb-4 text-center">
          Channel.
        </h4>
        <ul className="flex space-x-16">
          <CustomLink href={"mailto:" + email}>
            <Icon shape="email" />
          </CustomLink>
          <CustomLink href={"tel:" + phone}>
            <Icon
              shape="phone"
              className="w-14 h-14 text-black bg-white rounded-md peer"
            />
          </CustomLink>
        </ul>
      </section>

      {/* 화살표 및 텍스트로 적힌 이메일 휴대폰 번호 */}
      <section
        className="z-0 animate-slide-bottom opacity-0"
        style={{
          animationDelay: delayTime + 2 + "s",
        }}
      >
        <Icon
          shape="arrow-down"
          fill
          className="z-0 w-24 h-24 text-white animate-bounce mt-10 mx-auto"
        />

        <div className="z-0 bg-white flex flex-col p-4 rounded-md mt-2">
          <span className="text-center">
            Email:{" "}
            <strong className="underline-offset-2 decoration-2 hover:underline">
              <a href={"mailto:" + email}>{email}</a>
            </strong>
          </span>
          <span className="text-center">
            Phone:{" "}
            <strong className="underline-offset-2 decoration-2 hover:underline">
              <a href={"tel:" + phone}>{phone}</a>
            </strong>
          </span>
          <span className="text-center">
            마지막 수정: {dateOrTimeFormat(updatedAt, "YYYY-MM-DD")}
          </span>
        </div>
      </section>
    </article>
  );
};

export default Cover;
