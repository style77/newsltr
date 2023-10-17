import Provider from "@/redux/Provider";
import LoginPage from "./page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("Login Form", () => {
  it("should show a error message if the login button is clicked with empty fields", async () => {
    const user = userEvent.setup();
    render(
      <Provider>
        <LoginPage />
      </Provider>,
    );
    const loginButton = screen.getByText(/log in/i);
    await user.click(loginButton);
    const emailValidationError = screen.getByText(/invalid email/i);
    const passwordValidationError = screen.getByText(
      /password cannot be blank/i,
    );
    expect(emailValidationError).toBeInTheDocument();
    expect(passwordValidationError).toBeInTheDocument();
  });
});
