import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { parseSrt } from './utils/parseSrt';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const location = useLocation();
  const { video, captions } = location.state || {};
  const videoRef = useRef(null);
  const transcriptRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [captionsList, setCaptionsList] = useState([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const activeCaptionRef = useRef(null);

  useEffect(() => {
    if (captions) {
      // parse SRT file and set captions
      const fetchCaptions = async () => {
        const parsedCaptions = await parseSrt(`${process.env.PUBLIC_URL}/${captions}`);
        setCaptionsList(parsedCaptions);
      };
      fetchCaptions();
    }
  }, [captions]);

  useEffect(() => {
    // scroll to active caption if scrollEnabled true
    if (scrollEnabled && activeCaptionRef.current && transcriptRef.current) {
      transcriptRef.current.scrollTo({
        top: activeCaptionRef.current.offsetTop - transcriptRef.current.offsetTop,
        behavior: 'smooth',
      });
    }
  }, [currentTime, scrollEnabled]);

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

  const toggleScroll = () => {
    setScrollEnabled(prevScrollEnabled => !prevScrollEnabled);
  };

  return (
    <div className="container">
      <div className='video-container'>
        {video && (
          <video ref={videoRef} onTimeUpdate={handleTimeUpdate} controls>
            <source src={`${process.env.PUBLIC_URL}/${video}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="transcript-container" ref={transcriptRef}>
        <div className="btn-container">
          <button className='button' onClick={toggleScroll}>
            <span>
              {scrollEnabled ? 'Disable Scroll' : 'Enable Scroll'}
            </span>
          </button>
        </div>
        <div className="transcript">
          {captionsList.map(({ start, end, text }, index) => (
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
    </div>
  );
};

export default VideoPlayer;