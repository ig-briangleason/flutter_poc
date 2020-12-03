export const APPLICATION_LOADED: "APPLICATION_LOADED" = "APPLICATION_LOADED";

export type ApplicationLoadedAction = {
  type: typeof APPLICATION_LOADED
};

function applicationLoaded(): ApplicationLoadedAction {
  return {
    type: APPLICATION_LOADED
  };
}

export const Actions = {
  applicationLoaded: applicationLoaded,
};
