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
                   'userId', u."userId",
                   'firstName', u."firstName",
                   'lastName', u."lastName",
                   'email', u."email",
                   'isActive', u."isActive",
                   'createdBy', u."createdBy",
                   'createdDTM', u."createdDTM"
           )
    FROM public."Users" u
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
