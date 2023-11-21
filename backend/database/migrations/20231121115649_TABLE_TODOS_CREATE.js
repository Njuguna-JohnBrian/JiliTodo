/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTableIfNotExists("Todos", (table) => {
    table.increments("id").primary().notNullable().unsigned();
    table
      .uuid("todoid")
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .index("IX_Todos_todoid")
      .notNullable()
      .unsigned();
    table.string("todoname").notNullable();
    table.string("todonotes").notNullable();
    table.boolean("iscomplete").defaultTo(false);
    table
      .integer("createdby")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("Users")
      .withKeyName("FK_Todos_Users_createdby");
    table.dateTime("createddtm").notNullable();
    table
      .integer("updatedby")
      .nullable()
      .unsigned()
      .references("id")
      .inTable("Users")
      .withKeyName("FK_Todos_Users_updatedby");
    table.dateTime("updateddtm").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("Todos");
};
