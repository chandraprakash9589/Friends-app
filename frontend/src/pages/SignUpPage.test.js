import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SignUpPage from "../pages/SignUpPage";
import useSignUp from "../hooks/useSignUp";

// ✅ Mock the custom hook
jest.mock("../hooks/useSignUp", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// ✅ Helper to wrap in BrowserRouter (for <Link />)
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("SignUpPage Component", () => {
  const mockSignupMutation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSignUp.mockReturnValue({
      isPending: false,
      error: null,
      signupMutation: mockSignupMutation,
    });
  });

  // ✅ Test 1 — renders all form elements
  it("renders signup form correctly", () => {
    renderWithRouter(<SignUpPage />);

    expect(screen.getByText(/Create an Account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Create Account/i })).toBeInTheDocument();
  });

  // ✅ Test 2 — input fields update correctly
  it("updates input values when typing", () => {
    renderWithRouter(<SignUpPage />);

    const nameInput = screen.getByLabelText(/Full Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.change(emailInput, { target: { value: "john@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "mypassword" } });

    expect(nameInput.value).toBe("John Doe");
    expect(emailInput.value).toBe("john@example.com");
    expect(passwordInput.value).toBe("mypassword");
  });

  // ✅ Test 3 — submits with correct data
  it("calls signupMutation with correct data when form is submitted", () => {
    renderWithRouter(<SignUpPage />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: "Alice" } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: "alice@example.com" } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: "secure123" } });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("button", { name: /Create Account/i }));

    expect(mockSignupMutation).toHaveBeenCalledTimes(1);
    expect(mockSignupMutation).toHaveBeenCalledWith({
      fullName: "Alice",
      email: "alice@example.com",
      password: "secure123",
    });
  });

  // ✅ Test 4 — shows error message
  it("shows error message if useSignUp returns error", () => {
    useSignUp.mockReturnValueOnce({
      isPending: false,
      signupMutation: jest.fn(),
      error: { response: { data: { message: "Email already exists" } } },
    });

    renderWithRouter(<SignUpPage />);

    expect(screen.getByText(/Email already exists/i)).toBeInTheDocument();
  });

  // ✅ Test 5 — shows loading spinner
  it("shows loading state when isPending is true", () => {
    useSignUp.mockReturnValueOnce({
      isPending: true,
      signupMutation: jest.fn(),
      error: null,
    });

    renderWithRouter(<SignUpPage />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  // ✅ Test 6 — has Sign in link
  it("renders sign-in link correctly", () => {
    renderWithRouter(<SignUpPage />);
    const signInLink = screen.getByRole("link", { name: /Sign in/i });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink.getAttribute("href")).toBe("/login");
  });
});
