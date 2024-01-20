import "@/styles/globals.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

const client = new ApolloClient({
  uri: "https://flyby-router-demo.herokuapp.com/",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}
