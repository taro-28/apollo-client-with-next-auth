import { gql, useQuery } from "@apollo/client";
import { signIn, signOut, useSession } from "next-auth/react";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      description
      photo
    }
  }
`;

export default function Home() {
  const { data: session } = useSession();
  const { loading, error, data } = useQuery(GET_LOCATIONS);
  if (session) {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <main>
          {data.locations.map(({ id, name, description, photo }) => (
            <div key={id}>
              <h3>{name}</h3>
              <img
                width="400"
                height="250"
                alt="location-reference"
                src={`${photo}`}
              />
              <br />
              <b>About this location:</b>
              <p>{description}</p>
              <br />
            </div>
          ))}
        </main>
      </>
    );
  }
  return (
    <main>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </main>
  );
}
