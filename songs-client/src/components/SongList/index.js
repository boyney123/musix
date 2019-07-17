import React from "react";
import PropTypes from "prop-types";
import Song from "../Song";

const SongList = ({ songs = [], onSongSelect = () => {} }) => {
  return (
    <div className="column is-12">
      <div className="columns is-mobile is-multiline">
        {songs.map(song => {
          return <Song key={song._id} song={song} onSongSelect={onSongSelect} />;
        })}
      </div>
    </div>
  );
};

Song.propTypes = {
  onSongSelect: PropTypes.func,
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      artist: PropTypes.string,
      coverUrl: PropTypes.string,
      _id: PropTypes.string
    })
  )
};

export default SongList;
