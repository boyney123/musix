import { getSongs } from "./";

import axios from "axios";

jest.mock("axios", () => jest.fn());

describe("songs-api", () => {
  describe("getSongs", () => {
    it("returns a new route object", () => {
      getSongs();
      expect(axios).toHaveBeenCalledWith({
        method: "GET",
        json: true,
        url: "http://localhost:3000/songs?page=1&limit=100"
      });
    });
  });
});
