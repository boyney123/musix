import { convertSecondsToMinutesAndSeconds } from "./";

describe("time utils", () => {
  describe("convertSecondsToMinutesAndSeconds", () => {
    [
      { expectedResult: "00:05", seconds: 5 },
      { expectedResult: "00:15", seconds: 15 },
      { expectedResult: "01:00", seconds: 60 },
      { expectedResult: "01:01", seconds: 61 },
      { expectedResult: "01:15", seconds: 75 },
      { expectedResult: "10:10", seconds: 610 }
    ].forEach(({ seconds, expectedResult }) => {
      it(`${seconds} seconds should be convereted to ${expectedResult}`, () => {
        const result = convertSecondsToMinutesAndSeconds(seconds);
        expect(result).toEqual(expectedResult);
      });
    });
  });
});
