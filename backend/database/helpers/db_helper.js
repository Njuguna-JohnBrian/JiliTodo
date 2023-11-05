const { get, keys } = require("lodash");
const { db_config } = require("../db_config");

const db_helper = (connection) => ({
  /**
   * @param {Knex.Raw<*>|Knex.QueryBuilder<*, *>|Knex.AliasDict|Function} tableName
   * @param {Knex.Raw<*>|((this:Knex.QueryBuilder<*, UnwrapArrayMember<TResult> extends DeferredKeySelection.Any ? ArrayIfAlready<TResult, DeferredKeySelection.SetBase<UnwrapArrayMember<TResult>, *>> : (ArrayIfAlready<TResult, DeferredKeySelection.SetBase<*, *>> | TResult)>, builder: Knex.QueryBuilder<*, UnwrapArrayMember<TResult> extends DeferredKeySelection.Any ? ArrayIfAlready<TResult, DeferredKeySelection.SetBase<UnwrapArrayMember<TResult>, *>> : (ArrayIfAlready<TResult, DeferredKeySelection.SetBase<*, *>> | TResult)>) => void)|Knex.DbRecord<*>} whereParams
   * @param {Knex.QueryBuilder<*, *>|string|Array<string | Readonly<{column: string | Knex.QueryBuilder; order?: string; nulls?: string}>>} orderParam
   * @param {string} orderBy
   */
  search: async (
    tableName,
    whereParams,
    columns = "*",
    orderParam,
    orderBy,
    limitSingle = true,
  ) => {
    let query = db_config.select(columns).from(tableName).where(whereParams);

    if (orderBy && orderParam) {
      query = query.orderBy(orderParam, orderBy);
    }

    const result = await query.connection(connection);
    return limitSingle && result.length === 1 ? result[0] : result;
  },
  /**
   * @param {*} id
   * @param {Knex.Raw<*>|Knex.QueryBuilder<*, *>|Knex.AliasDict|Function} tableName
   */
  getById: async (id, tableName) => {
    const result = await db_config
      .select()
      .from(tableName)
      .where({ id: id })
      .connection(connection);

    return get(result, "[0", {});
  },
  /**
   * @param {TTable|string|Knex.Raw<*>|Knex.QueryBuilder<*, *>|Knex.AliasDict} tableName
   * @param {Knex.Raw<*>|((this:Knex.QueryBuilder<TRecord, TResult>, builder: Knex.QueryBuilder<TRecord, TResult>) => void)} whereParams
   * @param {TRecord extends Knex.CompositeTableType<*> ? Knex.ResolveTableType<TRecord, "update"> : Knex.DbRecordArr<TRecord>} data
   */
  update: async (tableName, whereParams, data) => {
    return db_config(tableName)
      .connection(connection)
      .where(whereParams)
      .update(data);
  },
  /**
   * @param {TTable|string|Knex.Raw<*>|Knex.QueryBuilder<*, *>|Knex.AliasDict} tableName
   */
  delete: async (tableName, id, data) => {
    let result = await db_config(tableName)
      .connection(connection)
      .where({ id: id })
      .update({ deleted: data });
    return get(result, "[0", {});
  },

  /**
   * @param {string} procName
   */
  exec: async (procName, params = []) => {
    const valueBindings = params.map(() => "?").join();
    params = params.map((x) => (x === undefined ? null : x));
    const sql = `CALL ${procName} (${valueBindings})`;
    const result = await db_config.raw(sql, params).connection(connection);
    const key = keys(result["rows"][0])[0];
    return get(result, `rows[0].${key}`, null);
  },

  /**
   * @param {string|number|boolean|object} query
   */
  raw: async (query, params = []) => {
    return db_config.raw(query, params).connection(connection);
  },
});

module.exports = { db_helper };
