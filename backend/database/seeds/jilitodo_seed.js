const jilitodo_seed = [
  {
    firstname: "Jili",
    lastname: "Todo",
    email: "jilitodo@gmail.com",
    passwordhash: "5994471abb01112afcc18159f6cc74b4f511b9980",
    createdby: 1,
    createddtm: "2023-11-03 19:10:25-07",
  },
];

const seed = async (knex) => {
  const userCount = await knex("Users").count("id as count").first();
  if (Number(userCount.count) === 0) {
    await knex("Users").truncate();
    await knex("Users").insert(jilitodo_seed);
  } else {
    console.info("Users table has records\nSkipping seeding");
  }
};

module.exports = { seed };
