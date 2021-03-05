import React from "react";
import ReactDOM from "react-dom";
import AppWrapper from "../src/Routes/AppWrapper";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";
import './global-styles';

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppWrapper />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
