import { useSession } from "next-auth/react";
import Link from "next/link";

export const Navigation = () => {
  const { data: session } = useSession();
  return (
    <nav className="w-full flex justify-between p-4">
      <ul className="flex space-x-2 items-center">
        <li>
          <Link className="text-blue-500" href="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="text-blue-500" href="/another-page">
            Another Page
          </Link>
        </li>
      </ul>
      <div className="flex space-x-2 items-center">
        <div>{session.user.email}</div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded
        "
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
};
