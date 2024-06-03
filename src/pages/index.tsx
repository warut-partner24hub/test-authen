import { signIn, signOut, useSession } from "next-auth/react";
import * as React from "react";

interface IIndexProps {}

const Index: React.FunctionComponent<IIndexProps> = () => {
  const { data: session, status } = useSession();

  return (
    <div className="text-2xl font-bold text-center mt-4 mb-4">
      <h1>Home Page</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : session ? (
        <>
          <h2>
            {session.user?.first_name} - {session.user?.last_name}
          </h2>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </div>
  );
};

export default Index;

{
  /* <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
<div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
  <h1 className="text-2xl font-bold mb-6">Home Page</h1>
  {status === "loading" ? (
    <p>Loading...</p>
  ) : session ? (
    <>
      <h2 className="text-xl mb-4">
        {session.user?.first_name} - {session.user?.last_name}
      </h2>
      <button
        className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
        onClick={() => signOut()}
      >
        Sign out
      </button>
    </>
  ) : (
    <button
      className="mt-4 w-full py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  )}
</div>
</div> */
}
