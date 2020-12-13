const config = require("./config-db");

module.exports = {
  test: {
    client: 'pg',
    connection: config.get("databaseUrl"),
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },
  development: {
    client: 'pg',
    connection: config.get("databaseUrl"),
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: config.get("databaseUrl") + "?ssl=true",
    pool: {
      min: Number(process.env.CONNECTION_POOL_MIN) || 2,
      max: Number(process.env.CONNECTION_POOL_MAX) || 4
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/production'
    }
  }
};
