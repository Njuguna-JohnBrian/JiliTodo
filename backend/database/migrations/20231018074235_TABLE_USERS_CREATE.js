/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTableIfNotExists("Users", (table) => {
    table.increments("id").primary().notNullable().unsigned();
    table
      .uuid("userid")
      .unique()
      .defaultTo(knex.raw("uuid_generate_v4()"))
      .index("IX_Users_userid")
      .notNullable()
      .unsigned();
    table.string("firstname").notNullable();
    table.string("lastname").notNullable();
    table.string("email").index("UQ_Users_email").unique().notNullable();
    table.string("passwordhash").notNullable();
    table.string("passwordresettoken").nullable();
    table.boolean("isactive").defaultTo(true);
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
  await knex.schema.dropTableIfExists("Users");
};
