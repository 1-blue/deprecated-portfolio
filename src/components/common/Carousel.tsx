import Slider, { Settings } from "react-slick";

// style
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings: Settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  dotsClass: "custom-dots",
};

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Carousel = ({ children, className }: Props) => {
  return (
    <Slider {...settings} className={className ? className : ""}>
      {children}
    </Slider>
  );
};

export default Carousel;
