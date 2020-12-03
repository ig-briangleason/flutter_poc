import * as React from "react";
import Body from "@Client/containers/body";
import { RouteComponentProps } from "react-router";
require('./styles.scss');

export type Props = {
  route: RouteComponentProps<{}>;
  applicationLoaded: () => void;
};

export default class App extends React.Component<Props, {}> {

  componentDidMount() {
    this.props.applicationLoaded();
  }

  render() {
    return (
      <div className="app-body">
        <Body {...this.props.route} />
      </div>
    );
  }
}
