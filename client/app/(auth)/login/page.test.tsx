import Provider from "@/redux/Provider";
import LoginPage from "./page";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeAll, afterAll, describe, expect, it } from "vitest";
import { rest } from "msw";
import { setupServer } from "msw/node";

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

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

  it("error appears if the account doesn't exist", async () => {
    // const url = `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/`;
    const url = `http://localhost:8000/api/v1/auth/`;
    server.use(
      rest.post(
        `http://localhost:8000/api/v1/auth/jwt/create/`,
        (_req, res, ctx) => {
          return res(
            ctx.status(401),
            ctx.json({ detail: "an error has occurred" }),
          );
        },
      ),
    );
    const user = userEvent.setup();

    render(
      <Provider>
        <LoginPage />
      </Provider>,
    );
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByText(/log in/i);
    expect(screen.queryByText("an error has occurred")).not.toBeInTheDocument();
    await userEvent.type(emailInput, "za@hotmail.fr");
    await user.type(passwordInput, "12345678");
    await user.click(loginButton);

    // const e = await screen.findByText(/an error has occurred/i);
    // expect(e).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByText("an error has occurred")).toBeInTheDocument(),
    );
  });
});
