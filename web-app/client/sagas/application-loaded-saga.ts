import { APPLICATION_LOADED, ApplicationLoadedAction } from "@Client/actions";
import { takeEvery } from "redux-saga/effects";

function applicationLoadedSaga(action: ApplicationLoadedAction) {
  console.log("Loaded!");
}

export function* setupApplicationLoadedSaga() {
  yield takeEvery(APPLICATION_LOADED, applicationLoadedSaga);
}
