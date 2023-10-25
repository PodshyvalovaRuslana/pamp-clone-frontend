import { useState, useEffect } from "react";
import useBreakpoints from "../../hooks/useBreakpoints";
import { EBreakpoint } from "../../constants";

interface IHero {
  title: string;
  content: string;
  imageUrl: string;
  imageMobileUrl: string;
}

const Hero: React.FC<IHero> = ({
  title,
  content,
  imageUrl,
  imageMobileUrl,
}) => {
  const { breakpoint } = useBreakpoints();
  const [backgroundImage, setBackgroundImage] = useState(imageUrl);

  useEffect(() => {
    breakpoint === EBreakpoint.MOBILE
      ? setBackgroundImage(imageMobileUrl)
      : setBackgroundImage(imageUrl);
  }, [breakpoint, imageUrl, imageMobileUrl]);

  const heroWrapperStyle = {
    background: `url(${backgroundImage}) no-repeat`,
    padding: "20px 120px",
  };

  const headerStyle = {
    fontSize: "18px",
    color: "red",
  };

  const contentStyle = {
    width: "30%",
  };

  return (
    <div style={heroWrapperStyle}>
      <h1 style={headerStyle}>{title}</h1>
      <div style={contentStyle}>{content}</div>
    </div>
  );
};

export default Hero;
