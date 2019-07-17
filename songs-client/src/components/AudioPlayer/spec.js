import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AudioPlayer from "./";

afterEach(cleanup);

const song = {
  title: "testing.mp3",
  artist: "boyne"
};

describe("AudioPlayer", () => {
  describe("renders", () => {
    it("a bannerMessage above the audio player when a bannerMessage is given", () => {
      const { getByLabelText } = render(<AudioPlayer bannerMessage="My banner message" />);
      expect(getByLabelText("Audio Banner")).toBeVisible();
    });
    it("does not render a bannerMessage when no bannerMessage is given", () => {
      const { queryByLabelText } = render(<AudioPlayer />);
      expect(queryByLabelText("Audio Banner")).toBe(null);
    });

    it("renders an audio element with the source set of the song of the given song", () => {
      const { getByLabelText } = render(<AudioPlayer song={song} />);
      expect(getByLabelText("Audio Source")).toBeVisible();
      expect(getByLabelText("Audio Source")).toHaveAttribute("src", "http://localhost:3000/download/testing.mp3");
    });

    it("renders the given song cover, title and artist", () => {
      const { getByAltText, getByLabelText } = render(<AudioPlayer song={song} />);
      expect(getByAltText("Song Cover")).toBeVisible();
      expect(getByLabelText("Song Title")).toBeVisible();
      expect(getByLabelText("Song Artist")).toBeVisible();
    });

    it("renders audio controls", () => {
      const { getByLabelText } = render(<AudioPlayer song={song} />);
      expect(getByLabelText("Audio Controls")).toBeVisible();
      expect(getByLabelText("Audio Control Play")).toBeVisible();
    });

    it("renders audio time", () => {
      const { getByLabelText } = render(<AudioPlayer song={song} />);
      expect(getByLabelText("Audio Times")).toBeVisible();
      expect(getByLabelText("Audio Progress")).toBeVisible();
      expect(getByLabelText("Audio Current Time")).toBeVisible();
      expect(getByLabelText("Audio Duration Time")).toBeVisible();
    });
  });

  describe("audio controls", () => {
    it("clicking on the play button renders a pause button", () => {
      const { getByLabelText } = render(<AudioPlayer song={song} />);

      expect(getByLabelText("Audio Control Play")).toBeVisible();

      fireEvent.click(getByLabelText("Audio Control Play"));

      expect(getByLabelText("Audio Control Pause")).toBeVisible();
    });

    it("clicking on the pause button pauses the given song and renders a play button", () => {
      const { getByLabelText, queryByLabelText } = render(<AudioPlayer song={song} />);

      expect(getByLabelText("Audio Control Play")).toBeVisible();

      fireEvent.click(getByLabelText("Audio Control Play"));

      expect(queryByLabelText("Audio Control Play")).toEqual(null);

      fireEvent.click(getByLabelText("Audio Control Pause"));

      expect(getByLabelText("Audio Control Play")).toBeVisible();
    });
  });

  describe("props", () => {
    describe("onChange", () => {
      it("clicking play on a song calls the `onChange` prop with the current state of playing the song and the song itself", () => {
        const spy = jest.fn();
        const { getByLabelText } = render(<AudioPlayer onChange={spy} song={song} />);
        fireEvent.click(getByLabelText("Audio Control Play"));
        expect(spy).toHaveBeenCalledWith(true, song);
      });
      it("clicking pause on a song calls the `onChange` prop with the current state of playing the song and the song itself", () => {
        const spy = jest.fn();
        const { getByLabelText } = render(<AudioPlayer onChange={spy} song={song} />);
        fireEvent.click(getByLabelText("Audio Control Play"));
        fireEvent.click(getByLabelText("Audio Control Pause"));
        expect(spy).toHaveBeenCalledWith(false, song);
      });
    });
    describe("onNextSong", () => {
      it("is called when the user clicks on the next song button", () => {
        const spy = jest.fn();
        const { getByLabelText } = render(<AudioPlayer onNextSong={spy} song={song} />);
        fireEvent.click(getByLabelText("Audio Control Next Song"));
        expect(spy).toHaveBeenCalled();
      });
    });
    describe("onPreviousSong", () => {
      it("is called when the user clicks on the previous song button", () => {
        const spy = jest.fn();
        const { getByLabelText } = render(<AudioPlayer onPreviousSong={spy} song={song} />);
        fireEvent.click(getByLabelText("Audio Control Previous Song"));
        expect(spy).toHaveBeenCalled();
      });
    });
  });
});
