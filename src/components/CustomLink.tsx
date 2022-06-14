type Props = {
  children: React.ReactNode;
  href: string;
};

const CustomLink = ({ children, href }: Props) => {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="relative">
      {children}
      <div className="-z-10 absolute top-0 left-0 w-full h-full peer-hover:animate-ping bg-white rounded-full" />
    </a>
  );
};

export default CustomLink;
