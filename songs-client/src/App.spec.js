import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { App } from "./App.js";

import { useSongContext } from "./components/SongContext";

afterEach(cleanup);

jest.mock("./components/SongContext", () => {
  return {
    useSongContext: jest.fn(() => {
      return {
        loading: true
      };
    })
  };
});

describe("App", () => {
  describe("renders", () => {
    it("a navigation bar", () => {
      const { getByLabelText } = render(<App />);
      expect(getByLabelText("Navigation")).toBeVisible();
    });
    it("renders a audio player when the current song is set in the store", () => {
      useSongContext.mockImplementation(() => ({
        loading: false,
        currentSong: { title: "test " }
      }));
      const { getByLabelText } = render(<App />);
      expect(getByLabelText("AudioPlayer")).toBeVisible();
    });
    it("does not render a audio player when no song has been selected", () => {
      useSongContext.mockImplementation(() => ({
        loading: false,
        currentSong: undefined
      }));
      const { queryByLabelText } = render(<App />);
      expect(queryByLabelText("AudioPlayer")).toEqual(null);
    });
    it("a loading message when loading songs", () => {
      useSongContext.mockImplementation(() => ({
        loading: true
      }));
      const { getByLabelText } = render(<App />);
      expect(getByLabelText("loader")).toBeVisible();
    });
    it("does not render a loading message when songs have been loaded", () => {
      useSongContext.mockImplementation(() => ({
        loading: false
      }));
      const { queryByLabelText } = render(<App />);
      expect(queryByLabelText("loader")).toEqual(null);
    });
    it("renders the list of songs that are in the store", () => {
      useSongContext.mockImplementation(() => ({
        loading: false,
        songs: [{ title: "test1", _id: "test1" }, { title: "test2", _id: "test2" }]
      }));
      const { getAllByLabelText } = render(<App />);
      expect(getAllByLabelText("Song")).toHaveLength(2);
    });
  });

  describe("interactions", () => {
    describe("selecting a song", () => {
      it("raises sets the new song", () => {
        const setCurrentSongSpy = jest.fn();

        useSongContext.mockImplementation(() => ({
          loading: false,
          currentSong: { title: "test1 " },
          songs: [{ title: "test1", _id: "test1" }, { title: "test2", _id: "test2" }],
          setCurrentSong: setCurrentSongSpy
        }));
        const { getAllByLabelText } = render(<App />);

        fireEvent.click(getAllByLabelText("Song")[0]);

        expect(setCurrentSongSpy).toHaveBeenCalled();
      });
    });
  });
});
