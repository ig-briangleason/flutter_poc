import { getConnection } from "db/knex";
import { Transaction } from "@Server/repository/repository";

async function transaction(callback: (trx: Transaction) => Promise<any>) {
  return await getConnection().transaction(async (trx: Transaction): Promise<object> => {
    try {
      await callback(trx);
      return await trx.commit();
    } catch (err) {
      await trx.rollback();
      return new Error(err.error);
    }
  });
}

export const Database = { transaction };
