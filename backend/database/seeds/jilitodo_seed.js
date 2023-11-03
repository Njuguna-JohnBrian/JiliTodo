const knex = require("knex");
const jilitodo_seed = [
  {
    id: 1,
    userId: "142e8446-f5ba-4813-bfb5-f3192a37f1bf",
    firstName: "Jili",
    lastName: "Todo",
    email: "jilitodo@gmail.com",
    passwordHash: "5994471abb01112afcc18159f6cc74b4f511b9980",
    createdBy: 1,
    createdDTM: "2023-11-03 19:10:25-07",
  },
];

const seed = async (knex) => {
  await knex("Users").truncate();
  await knex("Users").insert(jilitodo_seed);
};

module.exports = { seed };
