const knexfile = require("./knexfile");
const knex = require("knex");

const db_config = knex(knexfile);

module.exports = { db_config };
