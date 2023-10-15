require("dotenv").config({ path: "../.env" });
module.exports = {
  client: "pg",
  connection: {
    host: "localhost",
    user: process.env.DATABASE_USER,
    port: Number(process.env.DATABASE_PORT),
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
