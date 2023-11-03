/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable("Users", (table) => {
    table.increments("id").primary().notNullable();
    table
      .uuid("userid")
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .index("IX_Users_userId")
      .notNullable();
    table.string("firstname").notNullable();
    table.string("lastname").notNullable();
    table.string("email").index("UQ_Users_email").unique().notNullable();
    table.string("passwordhash").notNullable();
    table.string("passwordresettoken").nullable();
    table.boolean("isactive").defaultTo(true);
    table.integer("createdby").nullable();
    table.dateTime("createddtm").notNullable();
    table.integer("updatedby").nullable();
    table.dateTime("updateddtm").nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("Users");
};
