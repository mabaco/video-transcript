import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleClick = (video, captions) => {
    navigate('/video', { state: { video, captions } });
  };

  return (
    <div className="landing-page">
      <h1>Select a Video</h1>
      <div className="buttons">
        <button onClick={() => handleClick('video1.mp4', 'captions1.srt')}>Video 1</button>
        <button onClick={() => handleClick('video2.mp4', 'captions2.srt')}>Video 2</button>
      </div>
    </div>
  );
};

export default LandingPage;