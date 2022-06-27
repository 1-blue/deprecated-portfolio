import type { GetStaticProps, NextPage } from "next";
import { readFile } from "fs/promises";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkHtml from "remark-html";

// component
import Cover from "@src/components/Cover";
import Skills from "@src/components/Skills";
import Projects from "@src/components/Projects";

// type
import { CoverType, ProjectsType, SkillsType } from "@src/types";
type Props = {
  cover: CoverType;
  skills: SkillsType;
  projects: ProjectsType;
};

const Home: NextPage<Props> = ({ cover, skills, projects }) => {
  return (
    <>
      {/* 표지 */}
      <Cover {...cover} />

      {/* 스킬 */}
      <Skills {...skills} />

      {/* 프로젝트들 */}
      <Projects {...projects} />

      {/* 스크롤 테스트 */}
      <div className="h-[100vh]"></div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // 파일 읽기
  const coverFilePromise = readFile("./src/markdowns/cover.md");
  const skillsFilePromise = readFile("./src/markdowns/skills.md");
  const projectsFilePromise = readFile("./src/markdowns/projects.md");
  const [coverFile, skillsFile, projectsFile] = await Promise.all([
    coverFilePromise,
    skillsFilePromise,
    projectsFilePromise,
  ]);

  // front-matter 분리하기
  const parsedCover = JSON.parse(JSON.stringify(matter(coverFile)));
  const parsedSkills = JSON.parse(JSON.stringify(matter(skillsFile)));
  const parsedProjects = JSON.parse(JSON.stringify(matter(projectsFile)));

  // markdown 파싱
  const parsedMarkdownCoverPromise = unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(parsedCover.content);
  const parsedMarkdownSkillsPromise = unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(parsedSkills.content);
  const parsedMarkdownProjectsPromise = unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(parsedProjects.content);
  const [parsedMarkdownCover, parsedMarkdownSkills, parsedMarkdownProjects] =
    await Promise.all([
      parsedMarkdownCoverPromise,
      parsedMarkdownSkillsPromise,
      parsedMarkdownProjectsPromise,
    ]);

  return {
    props: {
      cover: {
        ...parsedCover.data,
        content: parsedMarkdownCover.value,
      },
      skills: {
        ...parsedSkills.data,
        content: parsedMarkdownSkills.value,
      },
      projects: {
        ...parsedProjects.data,
        content: parsedMarkdownProjects.value,
      },
    },
  };
};

export default Home;
