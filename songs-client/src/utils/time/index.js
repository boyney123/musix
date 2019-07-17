const convertSecondsToMinutesAndSeconds = time => {
  if (time === 0) {
    return "0:00";
  }
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time - mins * 60);

  const seconds = secs < 10 ? `0${secs}` : secs;
  const minutes = mins < 10 ? `0${mins}` : mins;

  return `${minutes}:${seconds}`;
};

export { convertSecondsToMinutesAndSeconds };
