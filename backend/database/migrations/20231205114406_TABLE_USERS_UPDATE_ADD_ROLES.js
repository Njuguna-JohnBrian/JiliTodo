/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("Users", (table) => {
    table
      .integer("roleid")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("Roles")
      .withKeyName("FK_Users_Roles_roleid");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("Users");
};
