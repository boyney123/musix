import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";

const Song = ({ song, onSongSelect }) => {
  const { title, artist, coverUrl } = song;
  return (
    <div className="column is-half-mobile is-3-tablet Song" onClick={() => onSongSelect(song)} aria-label="Song">
      <div className="Song__Cover">
        <figure className="image">
          <img src={coverUrl} alt="Song Cover" />
        </figure>
      </div>
      <div className="has-text-centered Song__Content is-size-7">
        <p className="has-text-weight-bold has-text-white" aria-label="Song Title">
          {title}
        </p>
        <p className="has-text-grey" aria-label="Song Artist">
          {artist}
        </p>
      </div>
    </div>
  );
};

Song.propTypes = {
  onSongSelect: PropTypes.func,
  song: PropTypes.shape({
    title: PropTypes.string,
    artist: PropTypes.string,
    coverUrl: PropTypes.string,
    _id: PropTypes.string
  })
};

export default Song;
