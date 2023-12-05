/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .raw(`DROP PROCEDURE IF EXISTS public.usersave(varchar, varchar, varchar, varchar, inout json);
CREATE OR REPLACE PROCEDURE public.UserSave(IN IN_FirstName character varying, IN IN_LastName character varying,
                                            IN IN_Email character varying,IN IN_Role_Id integer, IN IN_PasswordHash character varying,
                                            INOUT jsonResult json DEFAULT NULL::json)
    LANGUAGE 'plpgsql'
AS
$BODY$

BEGIN
    INSERT INTO public."Users"("firstname", "lastname", email, "roleid", "passwordhash",
                               "createddtm", "updateddtm")
    VALUES (IN_FirstName, IN_LastName, IN_Email,IN_Role_Id, IN_PasswordHash,now(), now())
    RETURNING row_to_json("Users".*)
        INTO jsonResult;
END ;
$BODY$`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.raw(
    `DROP PROCEDURE IF EXISTS public.usersave(varchar, varchar, varchar, integer, varchar, inout json);`,
  );
};
