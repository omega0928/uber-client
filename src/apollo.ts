import { ApolloClient, InMemoryCache, makeVar, Operation } from '@apollo/client';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem("jwt")));

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
  headers: {
    "X-JWT": localStorage.getItem("jwt") || ""
  }
});

export default client;