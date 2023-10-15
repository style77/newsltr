import Home from "@/app/(home)/page";
import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";

it("should render", () => {
  render(<Home />);
  expect(screen.getByText("Home")).toBeInTheDocument();
});
