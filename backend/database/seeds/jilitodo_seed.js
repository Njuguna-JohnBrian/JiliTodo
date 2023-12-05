const jilitodo_seed = {
  userTableSeed: [
    {
      firstname: "Jili",
      lastname: "Todo",
      email: "jilitodo@gmail.com",
      roleid: 1,
      passwordhash: "5994471abb01112afcc18159f6cc74b4f511b9980", //password:jilitodoTest123!
      createdby: 1,
      createddtm: "2023-11-03 19:10:25-07",
    },
  ],
  rolesTableSeed: [
    {
      rolename: "user",
      createdby: 1,
      createddtm: "2023-11-03 19:10:25-07",
    },
    {
      rolename: "admin",
      createdby: 1,
      createddtm: "2023-11-03 19:10:25-07",
    },
  ],
};

const seed = async (knex) => {
  const userCount = await knex("Users").count("id as count").first();
  const roleCount = await knex("Roles").count("id as count").first();
  if (Number(userCount.count) === 0) {
    await knex("Users").insert(jilitodo_seed["userTableSeed"]);
  } else {
    console.info("Users table has records\nSkipping seeding");
  }

  if (Number(roleCount.count) === 0) {
    await knex("Roles").insert(jilitodo_seed["rolesTableSeed"]);
  } else {
    console.info("Roles table has records\nSkipping seeding");
  }
};

module.exports = { seed };
