import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../Login";
import { ToastContainer } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

// Mock next-auth
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

// Mock useRouter
jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Login Form", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  test("renders Login form correctly", () => {
    render(
      <>
        <ToastContainer />
        <Login />
      </>
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  test("shows error messages for invalid input", async () => {
    render(
      <>
        <ToastContainer />
        <Login />
      </>
    );

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(
        screen.getByText("Please enter a valid email")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Password must be more than 6 characters")
      ).toBeInTheDocument();
    });
  });

  test("submits the form with valid input", async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: null });

    render(
      <>
        <ToastContainer />
        <Login />
      </>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledTimes(1);
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "john@example.com",
        password: "password123",
      });
    });
  });

  test("shows error message for invalid credentials", async () => {
    (signIn as jest.Mock).mockResolvedValue({ error: "Invalid credentials" });

    render(
      <>
        <ToastContainer />
        <Login />
      </>
    );

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledTimes(1);
    });

    await waitFor(async () => {
      const errMsg = "An unexpected error occurred. Please try again.";
      expect(await screen.findByText(errMsg)).toBeInTheDocument();
    });
  });
});
