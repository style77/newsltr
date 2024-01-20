import Home from "@/app/(home)/page";
import Provider from "@/redux/Provider";
import { render, screen } from "@testing-library/react";
import { it, expect } from "vitest";

it("should render", () => {
  render(
    <Provider>
      <Home />
    </Provider>,
  );
  expect(screen.getByText(/get started/i)).toBeInTheDocument();
});
