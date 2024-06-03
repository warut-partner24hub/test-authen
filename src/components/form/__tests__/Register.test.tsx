import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../Register";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

jest.mock("axios");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("Register", () => {
  const { container } = render(<Register />);
  expect(container).toMatchSnapshot();
});

describe("Register Form", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  it("renders Register form correctly", () => {
    render(
      <>
        <ToastContainer />
        <Register />
      </>
    );

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
    expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  });

  it("shows error messages for invalid input", async () => {
    render(
      <>
        <ToastContainer />
        <Register />
      </>
    );

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("First name is required")).toBeInTheDocument();
      expect(screen.getByText("Last name is required")).toBeInTheDocument();
      expect(
        screen.getByText("Please enter a valid email")
      ).toBeInTheDocument();
      expect(screen.getByText("Password is required")).toBeInTheDocument();
      expect(
        screen.getByText("Confirm password is required")
      ).toBeInTheDocument();
    });
  });

  it("submits the form with valid input", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockResolvedValue({
      data: { message: "Register Success!!" },
    });

    render(
      <>
        <ToastContainer />
        <Register />
      </>
    );

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Corner" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith("/api/auth/signup", {
        first_name: "John",
        last_name: "Corner",
        email: "john@example.com",
        password: "password123",
        confirm_password: "password123",
      });
    });

    await waitFor(() =>
      expect(screen.getByText("Register Success!!")).toBeInTheDocument()
    );
  });

  it("shows error message for existing email", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockRejectedValue({
      response: { data: { message: "Email already exists" } },
    });

    render(
      <>
        <ToastContainer />
        <Register />
      </>
    );

    fireEvent.change(screen.getByLabelText("First Name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last Name"), {
      target: { value: "Michel" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
    });

    await waitFor(() =>
      expect(screen.getByText("Email already exists")).toBeInTheDocument()
    );
  });
});
