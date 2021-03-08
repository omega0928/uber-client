import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import AddPlace from "../Components/LoggedInPage/AddPlace";
import EditAccount from "../Components/LoggedInPage/EditAccount";
import FindAddress from "../Components/LoggedInPage/FindAddress"
import Home from "../Components/LoggedInPage/Home";
import Login from "../Components/LoggedOutPage/Login";
import PhoneLogin from "../Components/LoggedOutPage/PhoneLogin";
import Places from "../Components/LoggedInPage/Places";
import Ride from "../Components/LoggedInPage/Ride";
import Settings from "../Components/LoggedInPage/Settings";
import SocialLogin from "../Components/LoggedOutPage/SocialLogin";
import VerifyPhone from "../Components/LoggedOutPage/VerifyPhone";

interface IProps {
  isLoggedIn: boolean;
}

const AppPresenter: React.FC<IProps> = ({ isLoggedIn }) => (
  <BrowserRouter>
    {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
  </BrowserRouter>
);

const LoggedOutRoutes: React.FC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Login} />
    <Route path={"/phone-login"} component={PhoneLogin} />
    <Route path={"/verify-phone"} component={VerifyPhone} />
    <Route path={"/social-login"} component={SocialLogin} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

const LoggedInRoutes: React.FC = () => (
  <Switch>
    <Route path={"/"} exact={true} component={Home} />
    <Route path={"/ride"} exact={true} component={Ride} />
    <Route path={"/edit-account"} exact={true} component={EditAccount} />
    <Route path={"/settings"} exact={true} component={Settings} />
    <Route path={"/places"} exact={true} component={Places} />
    <Route path={"/add-place"} exact={true} component={AddPlace} />
    <Route path={"/find-address"} exact={true} component={FindAddress} />
    <Redirect from={"*"} to={"/"} />
  </Switch>
);

export default AppPresenter;
