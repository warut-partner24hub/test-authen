import { signIn, signOut, useSession } from "next-auth/react";
import * as React from "react";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">Home Page</h1>
        {status === "loading" ? (
          <p className="text-gray-500">Loading...</p>
        ) : session ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              {session.user?.first_name} {session.user?.last_name}
            </h2>
            <p className="text-gray-700 mb-4">{session.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="w-full py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Index;
