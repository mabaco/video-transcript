import React from 'react';
import VideoPlayer from './VideoPlayer';
import Captions from "./captions.srt";

const App = () => {
  const captionsUrl = {Captions};
  return (
    <div>
      <VideoPlayer captionsUrl={captionsUrl} />
    </div>
  );
};

export default App;