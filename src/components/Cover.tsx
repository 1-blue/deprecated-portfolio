// component
import Icon from "@src/components/common/Icon";
import Content from "@src/components/common/Content";
import CustomLink from "@src/components/common/CustomLink";

type Props = {
  title: string;
  contents: string[];
  updatedAt: Date;
  email: string;
  phone: string;
};

const Cover = ({ title, contents, updatedAt, email, phone }: Props) => {
  return (
    <article className="relative bg-me h-screen bg-cover bg-center bg-no-repeat bg-fixed flex flex-col justify-center items-center">
      {/* opacity background */}
      <aside className="absolute w-full h-screen bg-black opacity-60" />

      {/* 메인 타이틀 */}
      <h1
        className="z-0 text-white font-bold text-5xl mb-10 animate-slide-bottom opacity-0 mx-[14vw]"
        style={{
          animationDelay: "1s",
        }}
      >
        {title}
      </h1>

      {/* 서브 타이틀 */}
      {contents.map((content, index) => (
        <Content key={index} content={content} delay={2.2 + index} />
      ))}

      {/* 깃헙, 벨로그, 트렐로 */}
      <section
        className="z-0 animate-slide-bottom opacity-0"
        style={{
          animationDelay: contents.length + 2.2 + "s",
        }}
      >
        <h3 className="text-white font-bold text-3xl mt-10 mb-4 text-center">
          Contect.
        </h3>
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
          animationDelay: contents.length + 2.2 + "s",
        }}
      >
        <h3 className="text-white font-bold text-3xl mt-10 mb-4 text-center">
          Channel.
        </h3>
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

      <Icon
        shape="arrow-down"
        fill
        className="z-0 w-24 h-24 text-white animate-bounce mt-20"
      />

      <section className="z-0 bg-white flex flex-col p-4 rounded-md mt-2">
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
      </section>
    </article>
  );
};

export default Cover;
