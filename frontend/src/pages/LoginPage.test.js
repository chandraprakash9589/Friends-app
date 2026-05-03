import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom"; 
import LoginPage from "./LoginPage";

jest.mock("../hooks/useLogin", () => ({
  __esModule: true,
  default: jest.fn(),
}));

import useLogin from "../hooks/useLogin";

describe("LoginPage Component", () => {
  const mockLoginMutation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useLogin.mockReturnValue({
      isPending: false,
      error: null,
      loginMutation: mockLoginMutation,
    });
  });

  it("renders login form correctly", () => {
    render(
      <MemoryRouter>     
        <LoginPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome Back/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("calls loginMutation with correct data when form is submitted", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole("button", { name: /Sign In/i });

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(mockLoginMutation).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "password123",
    });
  });
});
