import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { isLoggedInVar } from "../../apollo";
import theme from "../../theme";
import { ThemeProvider } from "../../typed-components";
import AppPresenter from "./AppPresenter";

function AppContainer() {
  const isLoggedIn = isLoggedInVar(Boolean(localStorage.getItem("jwt")));
  console.log('AppisLoggedIn', isLoggedIn)
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <AppPresenter isLoggedIn={isLoggedIn} />
      </ThemeProvider>
      <ToastContainer draggable={true} position={"bottom-center"} />
    </React.Fragment>
  );
}

export default AppContainer;
