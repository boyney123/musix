import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SongList from "./";

const songs = [
  {
    _id: "1",
    title: "Test1",
    artist: "Testing1",
    coverUrl: "randomImage.png"
  },
  {
    _id: "2",
    title: "Test2",
    artist: "Testing2",
    coverUrl: "randomImage.png"
  }
];

afterEach(cleanup);

describe("SongList", () => {
  describe("renders", () => {
    it("a list of songs", () => {
      const { getAllByLabelText } = render(<SongList songs={songs} />);
      expect(getAllByLabelText("Song")).toHaveLength(2);
    });
  });
  describe("props", () => {
    describe("onSongSelect", () => {
      it("calls the given `onSongSelect` prop with the song details when a song is selected", () => {
        const spy = jest.fn();

        const { getAllByLabelText } = render(<SongList songs={songs} onSongSelect={spy} />);

        fireEvent.click(getAllByLabelText("Song")[0]);

        expect(spy).toHaveBeenCalledWith(songs[0]);
      });
    });
  });
});
