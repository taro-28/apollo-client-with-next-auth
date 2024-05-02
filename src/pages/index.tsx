import { Navigation } from "@/components/Navigation";
import { gql, useQuery } from "@apollo/client";
import { signIn, signOut, useSession } from "next-auth/react";

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
    fetchPolicy: "cache-and-network",
  });
  if (!session) {
    return (
      <main>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </main>
    );
  }
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <main>
      <Navigation />
      <h1 className="text-4xl font-bold text-center mt-8">Home</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
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
