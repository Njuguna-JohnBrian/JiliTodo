/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema
    .raw(`DROP PROCEDURE IF EXISTS public.emailistaken(varchar, varchar, inout boolean);

create procedure emailistaken(IN targetuserid character varying, IN targetemail character varying, INOUT result boolean DEFAULT NULL::boolean)
    language plpgsql
as
$$

BEGIN
    select  exists(select *  from (
                                      SELECT email, userid
                                      FROM public."Users"
                                      WHERE userid <> targetUserId::uuid
                                  ) as eu where email = targetEmail)
    INTO result;


END;
$$;
`);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.raw(
    `DROP PROCEDURE IF EXISTS public.emailistaken(varchar, varchar, inout boolean)`,
  );
};
