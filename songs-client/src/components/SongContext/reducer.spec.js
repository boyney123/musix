import { reducer, setSongs, setCurrentSong, goToNextSong, goToPreviousSong } from "./reducer";

describe("reducer and actions", () => {
  describe("reducer", () => {
    describe("setSongs", () => {
      it("updates the `songs` in the state with the given payload", () => {
        const songs = [{ title: "testing", artist: "testing" }];

        const action = setSongs(songs);
        const state = reducer({}, action);

        expect(state).toEqual({
          songs
        });
      });
    });
    describe("setCurrentSong", () => {
      it("updates the currentSong in the state with the given payload", () => {
        const song = { title: "testing", artist: "testing" };

        const action = setCurrentSong(song);
        const state = reducer({}, action);

        expect(state).toEqual({
          currentSong: song
        });
      });
    });
    describe("goToNextSong", () => {
      it("updates the currentSong in the state with the next song in the list of songs", () => {
        const songs = [{ title: "song1", artist: "song1", _id: "1" }, { title: "song2", artist: "song2", _id: "2" }, { title: "song3", artist: "song3", _id: "3" }];

        const action = goToNextSong();
        const state = reducer({ songs, currentSong: songs[0] }, action);

        expect(state).toEqual({
          songs,
          currentSong: songs[1]
        });
      });
      it("when the currentSong is the last on on the list of songs, it sets the current song back to the first song in the list", () => {
        const songs = [{ title: "song1", artist: "song1", _id: "1" }, { title: "song2", artist: "song2", _id: "2" }, { title: "song3", artist: "song3", _id: "3" }];

        const action = goToNextSong();
        const state = reducer({ songs, currentSong: songs[2] }, action);

        expect(state).toEqual({
          songs,
          currentSong: songs[0]
        });
      });
    });
    describe("goToPreviousSong", () => {
      it("updates the currentSong in the state with the previous song in the list of songs", () => {
        const songs = [{ title: "song1", artist: "song1", _id: "1" }, { title: "song2", artist: "song2", _id: "2" }, { title: "song3", artist: "song3", _id: "3" }];

        const action = goToPreviousSong();
        const state = reducer({ songs, currentSong: songs[1] }, action);

        expect(state).toEqual({
          songs,
          currentSong: songs[0]
        });
      });
      it("when the currentSong is the first on on the list of songs, it sets the current song to the last song in the list", () => {
        const songs = [{ title: "song1", artist: "song1", _id: "1" }, { title: "song2", artist: "song2", _id: "2" }, { title: "song3", artist: "song3", _id: "3" }];

        const action = goToPreviousSong();
        const state = reducer({ songs, currentSong: songs[0] }, action);

        expect(state).toEqual({
          songs,
          currentSong: songs[2]
        });
      });
    });
    describe("no matching action", () => {
      it("when calling the reducer with an action that is not recognised the state is returned", () => {
        const songs = [{ title: "song1", artist: "song1", _id: "1" }, { title: "song2", artist: "song2", _id: "2" }, { title: "song3", artist: "song3", _id: "3" }];

        const state = reducer({ songs }, { type: "RANDOM_ACTION" });

        expect(state).toEqual({
          songs
        });
      });
    });
  });

  describe("action-creators", () => {
    describe("setSongs", () => {
      it("returns an action to set songs", () => {
        const songs = [{ title: "test" }];
        const action = setSongs(songs);
        expect(action).toEqual({
          type: "SET_SONGS",
          payload: songs
        });
      });
    });
    describe("setCurrentSong", () => {
      it("returns an action to set current song", () => {
        const song = { title: "test", artist: "testing" };
        const action = setCurrentSong(song);
        expect(action).toEqual({
          type: "SET_CURRENT_SONG",
          payload: song
        });
      });
    });
    describe("goToNextSong", () => {
      it("returns an action to go to next song", () => {
        const action = goToNextSong();
        expect(action).toEqual({
          type: "GO_TO_NEXT_SONG"
        });
      });
    });
    describe("goToPreviousSong", () => {
      it("returns an action to go to previous song", () => {
        const action = goToPreviousSong();
        expect(action).toEqual({
          type: "GO_TO_PREVIOUS_SONG"
        });
      });
    });
  });
});
