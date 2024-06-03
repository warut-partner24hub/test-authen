import { render, screen } from "@testing-library/react";
import Input from "../Inputs";
import { useForm } from "react-hook-form";

const Wrapper = ({ children }: any) => {
  const { register } = useForm();
  return children(register);
};

test("Input", () => {
  const { container } = render(
    <Wrapper>
      {(register: any) => (
        <Input
          name="first_name"
          label="First Name"
          type="text"
          placeholder="First Name"
          register={register}
        />
      )}
    </Wrapper>
  );
  expect(container).toMatchSnapshot();
});

describe("Input Component", () => {
  it("renders Input component correctly", () => {
    render(
      <Wrapper>
        {(register: any) => (
          <Input
            name="first_name"
            label="First Name"
            type="text"
            placeholder="First Name"
            register={register}
          />
        )}
      </Wrapper>
    );

    expect(screen.getByLabelText("First Name")).toBeInTheDocument();
  });

  it("shows error message", () => {
    render(
      <Wrapper>
        {(register: any) => (
          <Input
            name="first_name"
            label="First Name"
            type="text"
            placeholder="First Name"
            register={register}
            error="First name is required"
          />
        )}
      </Wrapper>
    );

    expect(screen.getByText("First name is required")).toBeInTheDocument();
  });

  it("disables the input", () => {
    render(
      <Wrapper>
        {(register: any) => (
          <Input
            name="first_name"
            label="First Name"
            type="text"
            placeholder="First Name"
            register={register}
            disable={true}
          />
        )}
      </Wrapper>
    );

    expect(screen.getByLabelText("First Name")).toBeDisabled();
  });
});
