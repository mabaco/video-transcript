import React, { useEffect, useRef, useState } from 'react';
import { parseSrt } from './utils/parseSrt';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const videoRef = useRef(null);
  const transcriptRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [captions, setCaptions] = useState([]);
  const activeCaptionRef = useRef(null);

  useEffect(() => {
    // Fetch and parse SRT file and set captions
    const fetchCaptions = async () => {
      const parsedCaptions = await parseSrt(`${process.env.PUBLIC_URL}/captions.srt`);
      setCaptions(parsedCaptions);
    };
    fetchCaptions();
  }, []);

  useEffect(() => {
    // Scroll to the active caption within the transcript container
    if (activeCaptionRef.current && transcriptRef.current) {
      transcriptRef.current.scrollTo({
        top: activeCaptionRef.current.offsetTop - transcriptRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [currentTime]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleCaptionClick = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  return (
    <div className="video-container">
      <video ref={videoRef} onTimeUpdate={handleTimeUpdate} controls>
        <source src={`${process.env.PUBLIC_URL}/video.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="transcript" ref={transcriptRef}>
        {captions.map(({ start, end, text }, index) => (
          <p
            key={index}
            ref={currentTime >= start && currentTime <= end ? activeCaptionRef : null}
            className={currentTime >= start && currentTime <= end ? "active" : ""}
            onClick={() => handleCaptionClick(start)}
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;