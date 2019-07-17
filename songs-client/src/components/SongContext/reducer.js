//reducer

const reducer = (state, action = {}) => {
  switch (action.type) {
    case SET_SONGS: {
      return {
        ...state,
        songs: action.payload
      };
    }
    case SET_CURRENT_SONG: {
      return {
        ...state,
        currentSong: action.payload
      };
    }
    case GO_TO_NEXT_SONG: {
      const {
        songs = [],
        currentSong: { _id: currentSongId }
      } = state;

      const currentSongIndex = songs.findIndex(song => song._id === currentSongId);
      const nextSongIndex = currentSongIndex + 1;

      const nextSong = nextSongIndex > songs.length - 1 ? songs[0] : songs[nextSongIndex];

      return {
        ...state,
        currentSong: nextSong
      };
    }
    case GO_TO_PREVIOUS_SONG: {
      const {
        songs = [],
        currentSong: { _id: currentSongId }
      } = state;

      const currentSongIndex = songs.findIndex(song => song._id === currentSongId);
      const previousSongIndex = currentSongIndex - 1;

      const previousSong = previousSongIndex < 0 ? songs[songs.length - 1] : songs[previousSongIndex];

      return {
        ...state,
        currentSong: previousSong
      };
    }

    default:
      return state;
  }
};

// action creators
const setSongs = songs => {
  return { type: SET_SONGS, payload: songs };
};

const setCurrentSong = song => {
  return { type: SET_CURRENT_SONG, payload: song };
};

const goToNextSong = song => {
  return { type: GO_TO_NEXT_SONG };
};

const goToPreviousSong = song => {
  return { type: GO_TO_PREVIOUS_SONG };
};

//actions
const SET_SONGS = "SET_SONGS";
const SET_CURRENT_SONG = "SET_CURRENT_SONG";
const GO_TO_NEXT_SONG = "GO_TO_NEXT_SONG";
const GO_TO_PREVIOUS_SONG = "GO_TO_PREVIOUS_SONG";

export { reducer, setSongs, setCurrentSong, goToNextSong, goToPreviousSong };
