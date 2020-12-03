import { getConnection } from "db/knex";

async function setup(): Promise<void> {
  const knex = getConnection();
  await knex.migrate.rollback();
  await knex.migrate.latest();
  // Not needed until we have db seeds
  // await knex.seed.run();
}

async function teardown(): Promise<void> {
  const knex = getConnection();
  await knex.migrate.rollback();
}

async function unlock(): Promise<void> {
  await getConnection().schema.hasTable("knex_migrations_lock").then(async (exists: boolean) => {
    if (exists) {
      await getConnection()("knex_migrations_lock")
        .update("is_locked", '0');
    }
  });
}

async function prepareDB(): Promise<void> {
  //const knex = getConnection();
  //Truncate db tables
}

export const DBHelper = {
  setup,
  teardown,
  unlock,
  prepareDB
};
