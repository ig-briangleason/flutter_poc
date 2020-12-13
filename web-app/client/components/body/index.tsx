import * as React from "react";
import { Switch } from "react-router-dom";
import { ROUTES } from "@Client/constants";
import { RouteComponentProps } from "react-router";
import HomePage from "@Client/components/home-page";

const Route = require("react-router-dom").Route;
require("./styles.scss");

export type Props = RouteComponentProps<{}>;

export default class Body extends React.Component<Props, {}> {
  render() {
    return (
      <div className="app-body">
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePage}/>
        </Switch>
      </div>
    );
  }
}
