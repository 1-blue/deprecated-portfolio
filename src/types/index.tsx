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
  projects: {
    Blelog: string;
    Blemarket: string;
    Blegram: string;
  };
};
