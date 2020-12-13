import { connect } from "react-redux";
import { Dispatch } from "redux";
import AppComponent, { Props as AppComponentProps } from "@Client/components/app";
import { RouteComponentProps } from "react-router";
import { State } from "@Client/reducers";
import { Actions } from "@Client/actions";

type StateProps = RouteComponentProps<any>;
type DispatchProps = Pick<AppComponentProps, "applicationLoaded">;
type OwnProps = RouteComponentProps<any>;

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
  return {
    ...ownProps
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    applicationLoaded: () => dispatch(Actions.applicationLoaded())
  };
}

const ConnectedAppComponent = connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent as any);

export default ConnectedAppComponent;
