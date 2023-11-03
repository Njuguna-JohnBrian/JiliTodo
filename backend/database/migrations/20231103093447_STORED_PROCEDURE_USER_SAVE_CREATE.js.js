/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .raw(`DROP PROCEDURE IF EXISTS public.usersave(varchar, varchar, varchar, varchar, integer, inout json);
CREATE OR REPLACE PROCEDURE public.UserSave(IN IN_FirstName character varying, IN IN_LastName character varying,
                                            IN IN_Email character varying, IN IN_PasswordHash character varying,
                                            IN IN_CreatedBy integer, INOUT jsonResult json DEFAULT NULL::json)
    LANGUAGE 'plpgsql'
AS
$BODY$

BEGIN
    INSERT INTO public."Users"("firstname", "lastname", email, "passwordhash", "createdby",
                               "createddtm", "updatedby", "updateddtm")
    VALUES (IN_FirstName, IN_LastName, IN_Email, IN_PasswordHash, IN_CreatedBy, now(), IN_CreatedBy, now())
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
    `DROP PROCEDURE IF EXISTS public.usersave(varchar, varchar, varchar, varchar, integer, inout json);`,
  );
};
