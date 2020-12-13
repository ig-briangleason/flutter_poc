import { getConnection } from "db/knex";
import * as Knex from "knex";

export type Optional<T> = T | undefined;
export type Transaction = Knex.Transaction;

async function all<M>(table: string): Promise<M[]> {
  const models: [M] = await getConnection()(table).select();
  return models;
}

async function byId<M>(table: string, id: number): Promise<Optional<M>> {
  return await getConnection()(table).where({ id }).first();
}

async function countAll(table: string): Promise<number> {
  return Number((await getConnection()(table).count("id"))[0].count);
}

async function insert<M>(table: string, model: M, trx?: Transaction, returningColumn: string = "id"): Promise<number> {
  const ids = await getConnection()(table).transacting(trx).upsert(model).returning(returningColumn);
  return ids[0];
}

async function insertMany<M>(table: string, models: M[], trx?: Transaction): Promise<number[]> {
  const ids = await getConnection()(table).transacting(trx).upsert(models).returning("id");
  return Array.isArray(ids) ? ids : [];
}

async function truncate(table: string, trx?: Transaction): Promise<void> {
  return await getConnection()(table).transacting(trx).del();
}

async function update<M>(table: string, id: number, updates: M, trx?: Transaction): Promise<number> {
  (updates as any).updatedAt = new Date();
  const ids = await getConnection()(table)
    .transacting(trx)
    .where({ id: id })
    .update(updates)
    .returning("id");
  return ids[0];
}

export type SortInfo<M> = {
  column: keyof M,
  direction: "desc" | "asc"
};

async function firstWhere<M>(table: string, predicate: Partial<M>, sortInfo?: SortInfo<M>): Promise<Optional<M>> {
  const baseQuery = getConnection()(table).select().where(predicate);

  if (sortInfo) {
    return await baseQuery.orderBy(sortInfo.column, sortInfo.direction).first();
  }
  return await baseQuery.first();
}

async function where<M>(table: string, predicate: Partial<M>): Promise<M[]> {
  return await getConnection()(table).select().where(predicate);
}

async function whereBetween<M>(table: string, column: keyof M, range: any[]): Promise<M[]> {
  return await getConnection()(table).select().whereBetween(column, range);
}

function knex(): any {
  return getConnection();
}

async function raw<T>(query: string, parameters: {}, trx?: Transaction): Promise<T[]> {
  const result: { rows: T[] } = await getConnection().raw(query, parameters).transacting(trx);
  return result.rows;
}

export const Repository = {
  knex,
  all,
  countAll,
  byId,
  insert,
  insertMany,
  truncate,
  update,
  where,
  firstWhere,
  whereBetween,
  raw
};
