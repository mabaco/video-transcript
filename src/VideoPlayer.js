import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Video from "./clip.mp4"

const VideoPlayer = ({ captionsUrl }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const playerRef = useRef(null);

  const handleProgress = ({ playedSeconds }) => {
    setCurrentTime(playedSeconds);
  };

  return (
    < > 
        <div>
            <ReactPlayer
                ref={playerRef}
                url={Video}
                width="80%"
                height="auto"
                controls
                onError={error => console.error(error)}
                onProgress={handleProgress}
            />
        </div>
        <div style={{backgroundColor:'yellow', width:"30%", height:"40%"}}>  
            g 
            
        </div>
    </>
  );
};

export default VideoPlayer;