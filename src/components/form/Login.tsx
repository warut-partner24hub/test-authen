import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Inputs from "../input/Inputs";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import { signIn } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toastify

interface ILoginProps {}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z
    .string()
    .min(6, "Password must be more than 6 characters")
    .max(16, "Password should not be more than 16 characters"),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const Login: React.FunctionComponent<ILoginProps> = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (data) => {
    try {
      const resSignIn: any = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (resSignIn.error) {
        toast.error(resSignIn.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login Form</h1>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() =>
                  router.push({
                    pathname: router.pathname,
                    query: { tab: "signup" },
                  })
                }
              >
                Sign up
              </span>
            </p>
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
