/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable("Users", (table)=>{
    table.increments("id").primary().notNullable();
    table.uuid("userId").unique().index("IX_Users_userId").notNullable();
    table.string("firstName").notNullable();
    table.string("lastName").notNullable();
    table.string("email").index("UQ_Users_email").unique().notNullable();
    table.string("passwordHash").notNullable();
    table.string("passwordResetToken").nullable();
    table.boolean("isActive").defaultTo(true);
    table.integer("createdBy").notNullable();
    table.dateTime("createdDTM").notNullable();
    table.integer("updatedBy").nullable();
    table.dateTime("updatedDTM").nullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("Users");
};
