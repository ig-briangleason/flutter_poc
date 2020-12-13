const environment: any = process.env.NODE_ENV || "development";
const config: any = require("../knexfile.js")[environment];
const knexLib: any = require("knex");

/** The currently open connection. Set by getConnection and destroyConnection */
let globalConnection: any = undefined;

/** A promisified alias of knex.destroy(). */
export async function destroyConnection(): Promise<void> {
  return new Promise<void>((resolve) => {
    if (globalConnection) {
      globalConnection.destroy(resolve);
      globalConnection = undefined;
    } else {
      resolve();
    }
  });
}

export function getConnection() {
  if (!globalConnection) {
    globalConnection = knexLib(config);
  }
  return globalConnection;
}
