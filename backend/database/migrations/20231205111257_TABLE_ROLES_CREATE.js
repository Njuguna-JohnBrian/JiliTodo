/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTableIfNotExists("Roles", (table) => {
    table.increments("id").primary().notNullable().unsigned();
    table
      .uuid("roleid")
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .index("IX_Roles_roleid")
      .notNullable()
      .unsigned();
    table.string("rolename").index("UQ_Roles_rolename").unique().notNullable();
    table.integer("createdby").nullable().unsigned();
    table.dateTime("createddtm").notNullable();
    table.integer("updatedby").nullable().unsigned();
    table.dateTime("updateddtm").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("Roles");
};
