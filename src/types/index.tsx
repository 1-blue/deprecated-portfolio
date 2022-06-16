export type DataType = {
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
  projects: ProjectType[];
};

export type ProjectType = {
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
};
