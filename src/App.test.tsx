// Packages
import React from "react";
import { render, screen } from "@testing-library/react";

// Components
import App from "./App";

test("Should render learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
