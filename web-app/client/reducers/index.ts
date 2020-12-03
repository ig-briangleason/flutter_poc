import { connectRouter, RouterState } from "connected-react-router";

export type State = {
  router?: RouterState
};

export const defaultState: State = {
};

const createRootReducer = (history: any) => {
  return (state: State = defaultState, action: any) => {
    state.router = connectRouter(history)(state.router, action);

    //Adding a new reducer:
    //state = updateRegistrationState(state, action);
    return state;
  };
};

export { createRootReducer };
