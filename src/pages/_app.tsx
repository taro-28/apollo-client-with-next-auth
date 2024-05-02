import "@/styles/globals.css";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { SessionProvider, useSession } from "next-auth/react";
import type { AppProps } from "next/app";
import { useMemo } from "react";

const httpLink = createHttpLink({
  uri: "https://flyby-router-demo.herokuapp.com/",
});

// const authLink = setContext(async (_, { headers }) => {
//   const session = await getSession();
//   return {
//     headers: {
//       ...headers,
//       authorization: session ? `Bearer ${session?.accessToken}` : "",
//     },
//   };
// });

const AuthApolloProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  const client = useMemo(
    () =>
      new ApolloClient({
        // link: authLink.concat(httpLink),
        link: httpLink,
        cache: new InMemoryCache(),
        headers: {
          authorization: `Bearer ${session?.accessToken}`,
        },
      }),
    [session],
  );
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <AuthApolloProvider>
        <Component {...pageProps} />
      </AuthApolloProvider>
    </SessionProvider>
  );
}
