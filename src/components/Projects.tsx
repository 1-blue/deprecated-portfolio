import { useCallback, useState } from "react";

// common-component
import Project from "@src/components/common/Project";
import Modal from "@src/components/common/Modal";
import Carousel from "@src/components/common/Carousel";
import Photo from "@src/components/common/Photo";

// type
import type { ProjectsType } from "@src/types";

type Props = ProjectsType;

const Projects = ({ projects, content }: Props) => {
  // 2022/09/17 - 확대해서 볼 이미지들 - by 1-blue
  const [photos, setPhotos] = useState<string[]>([]);
  // 2022/09/17 - 리뷰의 이미지들 자세히 보기 모달 - by 1-blue
  const [showModal, setShowModal] = useState(false);

  // 2022/09/17 - 이미지 자세히 보기 - by 1-blue
  const onClickPhoto = useCallback(
    (photos: string[]) => () => {
      setPhotos(photos);
      setShowModal(true);
    },
    []
  );

  return (
    <article>
      <section
        className="projects"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <ul className="w-4/5 lg:w-1/2 mx-auto space-y-8">
        {projects.map((project) => (
          <Project
            key={project.name}
            {...project}
            onClickPhoto={onClickPhoto}
          />
        ))}
      </ul>

      {/* 리뷰 이미지들 자세히 보기 모달 */}
      {showModal && (
        <Modal onCloseModal={() => setShowModal(false)}>
          <Carousel className="w-full h-full">
            {photos.map((photo) => (
              <Photo
                key={photo}
                photo={photo}
                className="w-full h-[40vh] xs:h-[60vh] sm:h-[70vh] lg:h-[90vh]"
                $contain
              />
            ))}
          </Carousel>
        </Modal>
      )}
    </article>
  );
};

export default Projects;
