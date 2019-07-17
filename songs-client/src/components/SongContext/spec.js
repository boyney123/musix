import React from "react";
import { render, cleanup, waitForElement } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom/extend-expect";
import { SongProvider, useSongContext } from "./";
import utils from "../../utils/songs-api";

afterEach(cleanup);

jest.mock("../../utils/songs-api", () => {
  return {
    getSongs: jest.fn(() => Promise.resolve({ data: "test" }))
  };
});

const ContextTestComponent = function() {
  const { loading, songs, currentSong } = useSongContext();

  return (
    <>
      {loading && <div data-testid="loading">Loading...</div>}
      {!loading && <div data-testid="data" />}
      {songs && <div data-testid="songs" />}
      {currentSong && <div data-testid="currentSong">{currentSong.title}</div>}
    </>
  );
};

const TestComponent = ({ initialState }) => {
  return (
    <SongProvider initialState={initialState}>
      <ContextTestComponent />;
    </SongProvider>
  );
};

describe("SongContext", () => {
  it("when mounted it makes a request to get the songs", async () => {
    act(() => {
      render(<TestComponent />);
    });

    expect(utils.getSongs).toHaveBeenCalled();
  });

  it("when mounted it makes a request to get the songs and sets the loading flag in the context", async () => {
    let renderedComponent;

    act(() => {
      renderedComponent = render(<TestComponent />);
    });

    const { getByTestId } = renderedComponent;

    expect(getByTestId("loading")).toBeVisible();

    await waitForElement(() => getByTestId("data"));

    expect(getByTestId("data")).toBeVisible();
  });

  it("when successfully requesting songs the songs are returned in the context", async () => {
    let renderedComponent;

    act(() => {
      renderedComponent = render(<TestComponent />);
    });

    const { getByTestId } = renderedComponent;

    await waitForElement(() => getByTestId("songs"));

    expect(getByTestId("songs")).toBeVisible();
  });

  it("the current song in the state is shared through context", async () => {
    let renderedComponent;
    const initialState = { currentSong: { title: "testing" } };

    act(() => {
      renderedComponent = render(<TestComponent initialState={initialState} />);
    });

    const { getByTestId } = renderedComponent;

    await waitForElement(() => getByTestId("currentSong"));

    expect(getByTestId("currentSong")).toBeVisible();
    expect(getByTestId("currentSong").innerHTML).toEqual("testing");
  });
});
