/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("Roles", (table) => {
    table
      .integer("createdby")
      .nullable()
      .unsigned()
      .references("id")
      .inTable("Users")
      .withKeyName("FK_Roles_Users_createdby");
    table
      .integer("updatedby")
      .nullable()
      .unsigned()
      .references("id")
      .inTable("Users")
      .withKeyName("FK_Roles_Users_updatedby");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("Roles");
};
