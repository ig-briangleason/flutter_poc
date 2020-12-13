import { spawn } from "redux-saga/effects";
import { setupApplicationLoadedSaga } from "@Client/sagas/application-loaded-saga";

function* sagas() {
  yield spawn(setupApplicationLoadedSaga);
}

export default sagas;
