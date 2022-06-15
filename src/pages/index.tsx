import type { GetStaticProps, NextPage } from "next";
import { readFileSync } from "fs";
import matter from "gray-matter";

// component
import Cover from "@src/components/Cover";
import Skills from "@src/components/Skills";

// type
import { DataType } from "@src/types";
type Props = DataType;

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
