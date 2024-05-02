import { Navigation } from "@/components/Navigation";
import { gql, useQuery } from "@apollo/client";
import { signIn, useSession } from "next-auth/react";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      name
      description
    }
  }
`;

export default function Home() {
  const { data: session } = useSession();
  const { loading, error, data } = useQuery(GET_LOCATIONS, {
    fetchPolicy: "cache-first",
  });
  if (!session) {
    return (
      <main>
        Not signed in <br />
        <button type="button" onClick={() => signIn()}>
          Sign in
        </button>
      </main>
    );
  }
  return (
    <main>
      <Navigation />
      <h1 className="mt-8 text-center font-bold text-4xl">Home</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {/* @ts-ignore */}
          {data.locations.map((location) => (
            <li key={location.id}>
              <h2>{location.name}</h2>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
