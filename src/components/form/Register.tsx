import { useState, useEffect, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
import Inputs from "../input/Inputs";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import React from "react";
import { useRouter } from "next/router";

const FormSchema = z
  .object({
    first_name: z
      .string()
      .min(1, "First name is required")
      .min(4, "First name must be more than 4 characters")
      .max(16, "First Name should not be more than 16 characters")
      .regex(/^[a-zA-Z]+$/, "No special character"),
    last_name: z
      .string()
      .min(1, "Last name is required")
      .min(4, "Last name must be more than 4 characters")
      .max(16, "Last Name should not be more than 16 characters")
      .regex(/^[a-zA-Z]+$/, "No special character"),
    email: z.string().email("Please enter a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be more than 6 characters")
      .max(16, "Password should not be more than 16 characters"),
    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const Register: React.FunctionComponent = React.memo(() => {
  const [passwordScore, setPasswordScore] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<FormSchemaType> = useCallback(
    async (data) => {
      try {
        const response = await axios.post("/api/auth/signup", data);
        reset();
        toast.success(response.data.message);
        setTimeout(() => router.push("/auth"), 3000);
      } catch (error: any) {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      }
    },
    [reset, router]
  );

  const validatePassword = useCallback(() => {
    const password = watch("password");
    return zxcvbn(password || "").score;
  }, [watch]);

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [validatePassword]);

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center bg-gray-100 min-h-screen">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Register Form</h1>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Register form"
          >
            <Inputs
              name="first_name"
              label="First Name"
              type="text"
              placeholder="First Name"
              register={register}
              error={errors.first_name?.message}
              disable={isSubmitting}
            />
            <Inputs
              name="last_name"
              label="Last Name"
              type="text"
              placeholder="Last Name"
              register={register}
              error={errors.last_name?.message}
              disable={isSubmitting}
            />
            <Inputs
              name="email"
              label="Email"
              type="text"
              placeholder="Email"
              register={register}
              error={errors.email?.message}
              disable={isSubmitting}
            />
            <Inputs
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
              register={register}
              error={errors.password?.message}
              disable={isSubmitting}
            />
            {watch("password")?.length > 0 && (
              <div className="flex mt-2" role="progressbar">
                {Array.from(Array(5).keys()).map((span, i) => (
                  <span className="w-1/5 px-1" key={i}>
                    <div
                      className={`h-2 ${
                        passwordScore <= 2
                          ? "bg-red-500"
                          : passwordScore < 4
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></div>
                  </span>
                ))}
              </div>
            )}
            <Inputs
              name="confirm_password"
              label="Confirm Password"
              type="password"
              placeholder="Confirm Password"
              register={register}
              error={errors.confirm_password?.message}
              disable={isSubmitting}
            />
            <div className="flex flex-row items-center text-sm">
              <p className="mr-1">Already have an account?</p>
              <button
                type="button"
                className="text-blue-500 cursor-pointer underline focus:outline-none"
                onClick={() => router.push("/auth")}
                aria-label="Sign in"
              >
                Sign in
              </button>
            </div>
            <button
              type="submit"
              className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
});

Register.displayName = "Register";

export default Register;
