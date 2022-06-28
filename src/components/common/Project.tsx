// common-component
import Carousel from "@src/components/common/Carousel";
import CustomLink from "@src/components/common/CustomLink";
import Icon from "@src/components/common/Icon";
import Photo from "@src/components/common/Photo";
import Skill from "@src/components/common/Skill";

// utill
import { dateOrTimeFormat } from "@src/libs/dateFormat";

// hook
import useScrollZoom from "@src/hooks/useScrollZoom";

// type
import { Project } from "@src/types";
type Props = Project;

const Project = ({
  date,
  description,
  links,
  logoColor,
  name,
  skills,
  thumbnails,
}: Props) => {
  return (
    <li
      className="bg-project px-10 py-6 rounded-md text-white shadow-xl"
      {...useScrollZoom({})}
    >
      <h2 className="font-bold text-4xl text-center">{name}</h2>

      <time className="block text-center text-slate-400 text-sm  mb-4">
        ( {dateOrTimeFormat(date.start, "YYYY.MM.DD")} ~{" "}
        {dateOrTimeFormat(date.end, "YYYY.MM.DD")} )
      </time>

      <div className="flex space-y-12 flex-col 2xl:flex-row 2xl:space-x-8 2xl:space-y-0">
        <Carousel className="2xl:w-1/2 h-full">
          {thumbnails?.map((thumbnail) => (
            <Photo
              key={thumbnail}
              photo={thumbnail}
              $contain
              className="w-full pt-[100%]"
            />
          ))}
        </Carousel>

        <div className="space-y-8">
          <p className="whitespace-pre-line">{description}</p>

          <ul className="space-x-2 mb-2">
            {skills.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
          </ul>

          <ul className="flex justify-evenly">
            <CustomLink href={links.github}>
              <Icon shape="github" />
            </CustomLink>
            <CustomLink href={links.velog}>
              <Icon shape="velog" />
            </CustomLink>
            <CustomLink href={links.trello}>
              <Icon shape="trello" />
            </CustomLink>
            <CustomLink href={links.deploy}>
              <Icon shape="logo" style={{ color: logoColor }} />
            </CustomLink>
          </ul>
        </div>
      </div>
    </li>
  );
};

export default Project;
