import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { resolve } from "url";
import "./styles.scss";

import { convertSecondsToMinutesAndSeconds } from "../../utils/time";

const AudioPlayer = ({ song = {}, onNextSong, onPreviousSong, bannerMessage, onChange = () => {} }) => {
  const { title, artist, coverUrl } = song;

  const [isPlaying, setPlaying] = useState();
  const [trackDuration, setTrackDuration] = useState(0);
  const [currentTrackTime, setCurrentTrackTime] = useState(0);

  const audioPlayer = React.createRef();

  const url = resolve(process.env.REACT_APP_SONGS_API, `download/${title}`);

  const toggle = () => {
    isPlaying ? audioPlayer.current.pause() : audioPlayer.current.play();
    const newState = !isPlaying;
    setPlaying(newState);
    onChange(newState, song);
  };

  const handleMetadata = () => {
    const duration = Math.floor(audioPlayer.current.duration);
    setTrackDuration(duration);
  };

  const handleTimeupdate = () => {
    const time = Math.floor(audioPlayer.current.currentTime);
    setCurrentTrackTime(time);
  };

  useEffect(() => {
    if (title) {
      audioPlayer.current.load();
      audioPlayer.current.play();
      setPlaying(true);
      onChange(true, song);
    }
  }, [title]);

  return (
    <>
      <div className="AudioPlayer" aria-label="AudioPlayer">
        {bannerMessage && (
          <div className="AudioPlayer__Banner" aria-label="Audio Banner">
            {bannerMessage}
          </div>
        )}

        <audio ref={audioPlayer} id="audioPlayer" onLoadedMetadata={handleMetadata} onTimeUpdate={() => handleTimeupdate()}>
          <source src={url} aria-label="Audio Source" preload="metadata" />
          Ooops, your browser is sooo old.
        </audio>

        <div className="AudioPlayer__Content columns">
          <div className="AudioPlayer__Song column is-5">
            <div className="media">
              <div className="media-left">
                <img width="50px" src={coverUrl} alt="Song Cover" />
              </div>
              <div className="media-content">
                <p className="has-text-weight-bold has-text-white" aria-label="Song Title">
                  {title}
                </p>
                <p className="has-text-grey" aria-label="Song Artist">
                  {artist}
                </p>
              </div>
            </div>
          </div>
          <div className="AudioPlayer__Controls column" aria-label="Audio Controls">
            <div>
              <i className="fas fa-fast-backward" aria-label="Audio Control Previous Song" onClick={onPreviousSong} />
              {isPlaying && <i className="fas fa-pause" aria-label="Audio Control Play" onClick={toggle} />}
              {!isPlaying && <i className="fas fa-play" aria-label="Audio Control Pause" onClick={toggle} />}
              <i className="fas fa-fast-forward" aria-label="Audio Control Next Song" onClick={onNextSong} />
            </div>
          </div>
          <div className="AudioPlayer__Times column has-text-centered" aria-label="Audio Times">
            <span aria-label="Audio Current Time">{convertSecondsToMinutesAndSeconds(currentTrackTime)}</span>
            <progress className="AudioPlayer__ProgressBar progress is-small" value={currentTrackTime} max={trackDuration} aria-label="Audio Progress" />
            <span aria-label="Audio Duration Time">{convertSecondsToMinutesAndSeconds(trackDuration)}</span>
          </div>
        </div>
      </div>
    </>
  );
};

AudioPlayer.propTypes = {
  bannerMessage: PropTypes.string,
  onNextSong: PropTypes.func,
  onPreviousSong: PropTypes.func,
  onChange: PropTypes.func,
  song: PropTypes.shape({
    title: PropTypes.string,
    artist: PropTypes.string,
    coverUrl: PropTypes.string,
    _id: PropTypes.string
  })
};

export default AudioPlayer;
