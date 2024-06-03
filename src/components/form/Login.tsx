import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Inputs from "../input/Inputs";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { signIn } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import React, { useCallback } from "react";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be more than 6 characters")
    .max(16, "Password should not be more than 16 characters"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const Login: React.FunctionComponent = React.memo(() => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = useCallback(
    async (data) => {
      try {
        const resSignIn: any = await signIn("credentials", {
          redirect: false,
          email: data.email,
          password: data.password,
        });

        if (resSignIn.error) {
          if (resSignIn.error === "CredentialsSignin") {
            toast.error(
              "Invalid credentials. Please check your email and password."
            );
          } else {
            toast.error("An unexpected error occurred. Please try again.");
          }
        } else {
          router.push("/");
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again.");
      }
    },
    [router]
  );

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center bg-gray-100 min-h-screen">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login Form</h1>
          <form
            className="space-y-6"
            onSubmit={handleSubmit(onSubmit)}
            aria-label="Login form"
          >
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
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="text-blue-500 cursor-pointer underline focus:outline-none"
                onClick={() =>
                  router.push({
                    pathname: router.pathname,
                    query: { tab: "signup" },
                  })
                }
                aria-label="Sign up"
              >
                Sign up
              </button>
            </p>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
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

Login.displayName = "Login";

export default Login;
