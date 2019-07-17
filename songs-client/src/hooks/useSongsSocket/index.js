import { useState, useEffect } from "react";
import openSocket from "socket.io-client";

export default function(currentSong) {
  const [socket] = useState(
    openSocket(process.env.REACT_APP_SONGS_SUBSCRIBER_API, {
      reconnection: false
    })
  );

  const [songs, setSongs] = useState({});
  const [numberOfListenersMessage, setNumberOfListenersMessage] = useState("");

  const sendSongStartedEvent = song => {
    if (socket.connected) {
      socket.emit("song-started", song);
    }
  };

  const sendSongStoppedEvent = song => {
    if (socket.connected) {
      socket.emit("song-stopped", song);
    }
  };

  const getNumberOfListenersForSong = () => {
    return songs[currentSong._id] || 0;
  };

  const updateNumberOfListenersMessage = () => {
    const numberOfListeners = getNumberOfListenersForSong();

    const otherListeners = numberOfListeners - 1;

    if (otherListeners < 1) {
      return setNumberOfListenersMessage("");
    }

    if (otherListeners === 1) {
      return setNumberOfListenersMessage("1 other person is listening to this song right now");
    }
    return setNumberOfListenersMessage(`${otherListeners} other people are listening to this song right now`);
  };

  useEffect(() => {
    if (socket.connected) {
      socket.on("song-state", songs => {
        setSongs(songs);
      });
    }
  }, []);

  useEffect(() => {
    if (currentSong) {
      updateNumberOfListenersMessage();
    }
  }, [songs]);

  return { sendSongStartedEvent, sendSongStoppedEvent, numberOfListenersMessage };
}
