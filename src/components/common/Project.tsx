import { useEffect, useState } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse/lib";
import remarkHtml from "remark-html";

// common-component
import Carousel from "@src/components/common/Carousel";
import CustomLink from "@src/components/common/CustomLink";
import Icon from "@src/components/common/Icon";
import Photo from "@src/components/common/Photo";
import Skill from "@src/components/common/Skill";

// utill
import { dateFormat } from "@src/libs/dateFormat";

// hook
import useScrollZoom from "@src/hooks/useScrollZoom";

// type
import { Project } from "@src/types";
type Props = Project & {
  onClickPhoto: (photos: string[]) => () => void;
};

const Project = ({
  date,
  description,
  links,
  logoColor,
  name,
  skills,
  thumbnails,
  onClickPhoto,
}: Props) => {
  // 2022/07/07 - 프로젝트 내용 파싱 - by 1-blue
  const [parsedDescription, setParsedDescription] = useState<any>("");
  useEffect(() => {
    (async () => {
      const markdown = await unified()
        .use(remarkParse)
        .use(remarkHtml)
        .process(description);

      setParsedDescription(markdown.value);
    })();
  }, [description]);

  return (
    <>
      <li
        className="bg-project p-4 sm:px-10 sm:py-6 rounded-md text-white shadow-xl"
        {...useScrollZoom({})}
      >
        <h2 className="font-bold text-4xl text-center">{name}</h2>

        <time className="block text-center text-slate-400 text-sm  mb-4">
          ( {dateFormat(date.start, "YYYY.MM.DD")} ~{" "}
          {dateFormat(date.end, "YYYY.MM.DD")} )
        </time>

        <div className="flex space-y-12 flex-col 2xl:flex-row 2xl:space-x-8 2xl:space-y-0">
          <div className="2xl:w-1/2 h-full" onClick={onClickPhoto(thumbnails)}>
            <Carousel className="w-full h-full">
              {thumbnails?.map((thumbnail) => (
                <Photo
                  key={thumbnail}
                  photo={thumbnail}
                  $contain
                  className="w-full pt-[100%] cursor-pointer"
                />
              ))}
            </Carousel>
          </div>

          <div className="space-y-4 flex flex-col p-4">
            <div
              className="project-description whitespace-pre-line flex-1"
              dangerouslySetInnerHTML={{ __html: parsedDescription }}
            />

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
    </>
  );
};

export default Project;
