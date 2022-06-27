type Content = {
  content: string;
};

export type CoverType = {
  email: string;
  phone: string;
  updatedAt: Date;
} & Content;
export type SkillsType = {
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
    [index: string]: string;
  };
} & Content;
export type ProjectsType = {
  projects: {
    name: string;
    skills: string[];
    description: string;
    thumbnails: string[];
    links: {
      deploy: string;
      github: string;
      trello: string;
      velog: string;
    };
    date: {
      start: Date;
      end: Date;
    };
    logoColor: string;
  }[];
} & Content;
