import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Nav from "./";

afterEach(cleanup);

describe("Nav", () => {
  describe("renders", () => {
    it("the navigation bar", () => {
      const { getByLabelText } = render(<Nav />);
      expect(getByLabelText("Navigation")).toBeVisible();
    });
  });
});
