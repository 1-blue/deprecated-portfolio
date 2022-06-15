import type { GetStaticProps, NextPage } from "next";
import { readFileSync } from "fs";
import matter from "gray-matter";

// component
import Cover from "@src/components/Cover";
import Skills from "@src/components/Skills";

type Props = {
  title: string;
  contents: string[];
  updatedAt: Date;
  email: string;
  phone: string;
  skills: {
    "HTML/CSS": string;
    JavaScript: string;
    TypeScript: string;
    "React.js": string;
    "Next.js": string;
    "Node.js": string;
    Mysql: string;
    "Git/GitHub": string;
    Trello: string;
  };
  projects: {
    Blelog: string;
    Blemarket: string;
    Blegram: string;
  };
};

const Home: NextPage<Props> = ({
  title,
  email,
  phone,
  contents,
  updatedAt,
  skills,
}) => {
  return (
    <>
      {/* 표지 */}
      <Cover
        title={title}
        contents={contents}
        updatedAt={updatedAt}
        email={email}
        phone={phone}
      />

      {/* 스킬 */}
      <Skills skills={skills} />

      {/* 프로젝트들 */}
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const markdownFile = readFileSync("./src/markdowns/data.md");
  const data = matter(markdownFile).data as Props;
  const updatedAt = JSON.parse(JSON.stringify(data.updatedAt));

  return {
    props: {
      ...data,
      updatedAt,
    },
  };
};

export default Home;
