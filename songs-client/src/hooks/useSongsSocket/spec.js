import { renderHook, act } from "@testing-library/react-hooks";
import useSongsSocket from "./";
import socket from "socket.io-client";

jest.mock("socket.io-client", () => {
  return jest.fn(() => {
    return {
      connected: true,
      on: jest.fn(),
      emit: jest.fn()
    };
  });
});

const song = { title: "testing", artist: "boyne", _id: "song1" };

const setupSocketsWithListeners = numberOfListeners => {
  const emitSpy = jest.fn();
  const onSpy = jest.fn();

  const socketState = {
    song1: numberOfListeners
  };

  socket.mockImplementation(() => {
    return {
      connected: true,
      on: (eventName, callback) => {
        callback(socketState);
      },
      emit: emitSpy
    };
  });

  const { result } = renderHook(() => useSongsSocket(song));

  act(() => {
    onSpy("test");
  });

  return result.current.numberOfListenersMessage;
};

const setupSocketsWithEmitMock = () => {
  const emitSpy = jest.fn();

  socket.mockImplementation(() => {
    return {
      connected: true,
      on: jest.fn(),
      emit: emitSpy
    };
  });

  const { result } = renderHook(() => useSongsSocket());

  return { emitSpy, result };
};

describe("useSongsSocket", () => {
  describe("sendSongStartedEvent", () => {
    it("if the socket is connected an `song-started` event  is sent with the given song", () => {
      const { emitSpy, result } = setupSocketsWithEmitMock();

      act(() => {
        result.current.sendSongStartedEvent(song);
      });

      expect(emitSpy).toHaveBeenCalledWith("song-started", song);
    });
  });
  describe("sendSongStoppedEvent", () => {
    it("if the socket is connected an `song-stopped` event  is sent with the given song", () => {
      const { emitSpy, result } = setupSocketsWithEmitMock();

      act(() => {
        result.current.sendSongStoppedEvent(song);
      });

      expect(emitSpy).toHaveBeenCalledWith("song-stopped", song);
    });
  });
  describe("numberOfListenersMessage", () => {
    it("is set to an empty string when less than 2 listeners are listening to a song", () => {
      const result = setupSocketsWithListeners(1);
      expect(result).toEqual("");
    });

    it("is set to `1 other person is listening to this song right now` when the user and another user is listening to the same song", () => {
      const result = setupSocketsWithListeners(2);
      expect(result).toEqual("1 other person is listening to this song right now");
    });

    it("is set to `X other people are listening to this song right now` when more than 1 other listener is listening to the current song", () => {
      const result = setupSocketsWithListeners(5);
      expect(result).toEqual("4 other people are listening to this song right now");
    });
  });
});
