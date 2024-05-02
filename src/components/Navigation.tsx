import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export const Navigation = () => {
  const { data: session, update } = useSession();
  return (
    <nav className="flex w-full justify-between p-4">
      <ul className="flex items-center space-x-2">
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
      <div className="flex items-center space-x-2">
        {/* @ts-ignore */}
        <div>{session?.user.email}</div>
        <button
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          onClick={() => signOut()}
          type="button"
        >
          Sign out
        </button>
        <button type="button" onClick={() => update()}>
          Edit name
        </button>
      </div>
    </nav>
  );
};
