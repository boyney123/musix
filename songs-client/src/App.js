import React from "react";
import { SongProvider, useSongContext } from "./components/SongContext";

import SongList from "./components/SongList";
import NavBar from "./components/Navbar";
import AudioPlayer from "./components/AudioPlayer";
import useSongsSocket from "./hooks/useSongsSocket";

import "./scss/index.scss";

export function App() {
  const { loading, songs, currentSong, setCurrentSong, goToNextSong, goToPreviousSong } = useSongContext();
  const { sendSongStartedEvent, sendSongStoppedEvent, numberOfListenersMessage } = useSongsSocket(currentSong);

  const handleSongSelect = song => {
    if (currentSong) {
      sendSongStoppedEvent(currentSong);
    }
    setCurrentSong(song);
  };

  const handleAudioChange = (isPlaying, song) => {
    isPlaying ? sendSongStartedEvent(song) : sendSongStoppedEvent(song);
  };

  return (
    <>
      <NavBar />
      {loading && <h4 aria-label="loader">Loading media...</h4>}
      {!loading && (
        <section className="section Main">
          <div className="container">
            <div className="columns">
              <SongList songs={songs} onSongSelect={handleSongSelect} />
            </div>
          </div>
        </section>
      )}
      {currentSong && <AudioPlayer bannerMessage={numberOfListenersMessage} song={currentSong} onNextSong={goToNextSong} onPreviousSong={goToPreviousSong} onChange={handleAudioChange} />}
    </>
  );
}

function Root() {
  return (
    <SongProvider>
      <App />
    </SongProvider>
  );
}

export default Root;
