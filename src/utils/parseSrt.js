import parser from 'subtitles-parser';

export const parseSrt = async (filePath) => {
  const response = await fetch(filePath);
  const srtContent = await response.text();
  const captions = parser.fromSrt(srtContent);
  return captions.map(({ startTime, endTime, text }) => ({
    start: convertToSeconds(startTime),
    end: convertToSeconds(endTime),
    text,
  }));
};

const convertToSeconds = (time) => {
  const [hours, minutes, seconds] = time.split(':');
  const [sec, ms] = seconds.split(',');
  return parseInt(hours, 10) * 3600 + parseInt(minutes, 10) * 60 + parseInt(sec, 10) + parseInt(ms, 10) / 1000;
};