import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Song from "./";

const song = {
  title: "Test",
  artist: "Testing",
  coverUrl: "randomImage.png"
};

afterEach(cleanup);

describe("Song", () => {
  describe("renders", () => {
    it("an image for the song cover", () => {
      const { getByAltText } = render(<Song song={song} />);
      expect(getByAltText("Song Cover")).toBeVisible();
    });
    it("the title and artist of the song", () => {
      const { getByLabelText } = render(<Song song={song} />);

      expect(getByLabelText("Song Title")).toBeVisible();
      expect(getByLabelText("Song Title").innerHTML).toEqual("Test");

      expect(getByLabelText("Song Artist")).toBeVisible();
      expect(getByLabelText("Song Artist").innerHTML).toEqual("Testing");
    });
  });
  describe("props", () => {
    describe("onSongSelect", () => {
      it("when clicking on a song the `onSongSelect` callback is called with the song details", () => {
        const spy = jest.fn();

        const { getByLabelText } = render(<Song song={song} onSongSelect={spy} />);
        fireEvent.click(getByLabelText("Song"));

        expect(spy).toHaveBeenCalledWith(song);
      });
    });
  });
});
