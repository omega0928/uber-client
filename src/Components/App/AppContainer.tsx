import React from "react";
import { isLoggedInVar } from "../../apollo";
import theme from "../../theme";
import { ThemeProvider } from "../../typed-components";
import AppPresenter from "./AppPresenter";

function AppContainer() {
  const isLoggedIn = isLoggedInVar;
  return (
    <ThemeProvider theme={theme}>
      <AppPresenter />
    </ThemeProvider>
  );
}

export default AppContainer;
