import type { GetStaticProps, NextPage } from "next";
import { readFileSync } from "fs";
import matter from "gray-matter";

// component
import Cover from "@src/components/Cover";
import Skills from "@src/components/Skills";
import Projects from "@src/components/Project";

// type
import { DataType } from "@src/types";
import Project from "@src/components/Project";
type Props = DataType;

const Home: NextPage<Props> = ({
  title,
  email,
  phone,
  contents,
  updatedAt,
  skills,
  projects,
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
      <article>
        <h2 className="text-center font-bold text-6xl mt-20 mb-4">Projects.</h2>

        <ul className="w-3/5 min-w-[500px] mx-auto space-y-8">
          {projects.map((project) => (
            <Project key={project.name} project={project} />
          ))}
        </ul>
      </article>

      {/* 스크롤 테스트 */}
      <div className="h-[100vh]"></div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const markdownFile = readFileSync("./src/markdowns/data.md");
  const data = JSON.parse(JSON.stringify(matter(markdownFile).data)) as Props;

  return {
    props: {
      ...data,
    },
  };
};

export default Home;
