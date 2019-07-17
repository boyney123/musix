import React, { useEffect, useState, useReducer } from "react";

import { reducer, setSongs, setCurrentSong, goToNextSong, goToPreviousSong } from "./reducer";
import { getSongs } from "../../utils/songs-api";

const SongContext = React.createContext();
const defaultState = { songs: [], currentSong: null };

function SongProvider({ children, initialState }) {
  const [loading, setLoading] = useState();
  const [state, dispatch] = useReducer(reducer, initialState || defaultState);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const { data } = await getSongs();
        dispatch(setSongs(data));
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const context = {
    currentSong: state.currentSong,
    songs: state.songs,
    goToNextSong: () => dispatch(goToNextSong()),
    goToPreviousSong: () => dispatch(goToPreviousSong()),
    setCurrentSong: song => dispatch(setCurrentSong(song)),
    loading
  };

  return <SongContext.Provider value={context}>{children}</SongContext.Provider>;
}

function useSongContext() {
  return React.useContext(SongContext);
}

export { SongProvider, useSongContext };
