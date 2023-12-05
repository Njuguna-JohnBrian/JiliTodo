/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .raw(`DROP PROCEDURE IF EXISTS public.findUser(character varying, json);

CREATE OR REPLACE PROCEDURE public.findUser(IN userEmail character varying, INOUT jsonResult json DEFAULT NULL::json)
    LANGUAGE 'plpgsql'
AS
$BODY$

BEGIN
    SELECT json_build_object(
                   'userId', u."userid",
                   'firstName', u."firstname",
                   'lastName', u."lastname",
                   'email', u."email",
                   'rolename', r."rolename",
                   'isActive', u."isactive",
                   'createdBy', u."createdby",
                   'createdDTM', u."createddtm"
           )
    FROM public."Users" u
    LEFT JOIN public."Roles" r on u.roleid = r.id
    WHERE u.email = userEmail
    INTO jsonResult;
END;
$BODY$;`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.raw(
    `DROP PROCEDURE IF EXISTS public.findUser(character varying, json)`,
  );
};
