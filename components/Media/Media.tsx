"use client";
import React, { useRef } from "react";
import ReactPlayer from "react-player/lazy";
import CustomPlayIcon from "./CustomPlayIcon";

interface IMedia {
  title: string;
  videoUrl: string;
  posterUrl: string;
}

const Media: React.FC<IMedia> = ({ title, videoUrl, posterUrl }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const PlayIcon = <CustomPlayIcon />;

  return (
    <>
      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        light={posterUrl}
        playing
        playIcon={PlayIcon}
        muted={true}
        controls={true}
        onEnded={() => playerRef.current?.showPreview()}
        config={{
          file: {
            attributes: {
              style: {
                width: "100%",
                height: "100%",
                objectFit: "cover",
              },
            },
          },
        }}
      />
      <p>{title}</p>
    </>
  );
};

export default Media;
