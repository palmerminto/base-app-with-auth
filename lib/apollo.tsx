import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { auth } from "./firebase/firebaseClient";

const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL,
    fetch: async (uri, options) => {
      const token = await new Promise<string | null>((resolve) => {
        if (auth?.currentUser) {
          auth.currentUser.getIdToken().then(resolve);
        } else {
          const unsubscribe = auth?.onAuthStateChanged(async (user) => {
            unsubscribe && unsubscribe();
            resolve(user ? await user.getIdToken() : null);
          });
        }
      });

      const headers = {
        ...options?.headers,
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      };

      return fetch(uri, { ...options, headers });
    },
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
};

export const client = createApolloClient();
