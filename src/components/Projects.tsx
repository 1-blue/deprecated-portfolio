// common-component
import Project from "@src/components/common/Project";

// type
import type { ProjectsType } from "@src/types";

type Props = ProjectsType;

const Projects = ({ projects, content }: Props) => {
  return (
    <article>
      <section
        className="projects"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <ul className="w-3/5 min-w-[500px] mx-auto space-y-8">
        {projects.map((project) => (
          <Project key={project.name} {...project} />
        ))}
      </ul>
    </article>
  );
};

export default Projects;
