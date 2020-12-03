import { connect } from "react-redux";
import { Dispatch } from "redux";
import BodyComponent from "@Client/components/body";
import { RouteComponentProps, withRouter } from "react-router";

type StateProps = {};
type DispatchProps = {};
type OwnProps = RouteComponentProps<{}>;

function mapStateToProps(state: any): StateProps {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {};
}

const ConnectedBodyComponent = withRouter(connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(BodyComponent));

export default ConnectedBodyComponent;
