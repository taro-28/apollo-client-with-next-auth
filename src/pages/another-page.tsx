import { Navigation } from "@/components/Navigation";
import { gql, useQuery } from "@apollo/client";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      name
      description
    }
  }
`;

export default function Index() {
  const { loading, error, data } = useQuery(GET_LOCATIONS, {
    fetchPolicy: "cache-first",
  });
  return (
    <main>
      <Navigation />
      <h1 className="mt-8 text-center font-bold text-4xl">Another Page</h1>
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
