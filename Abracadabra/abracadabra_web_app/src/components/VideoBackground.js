import React from "react";

export default function VideoBackground() { 
    const videoRef= React.useRef();
    const setPlayBack = () => {
      videoRef.current.playbackRate = 1; //only works first time the page get's visited something goes wrong with caching / server rendering
    };
    return (
        <video autoPlay muted loop id="myVideo"
          ref={videoRef}
          onCanPlay={() => setPlayBack()}>
          <source src='/galaxy_loop.mp4' type="video/mp4"></source>
        </video>
    );
  }