DROP FUNCTION IF EXISTS describe(text);
CREATE OR REPLACE FUNCTION describe(t text)
RETURNS TABLE (
    column_name text,
    data_type text,
    character_maximum_length int,
    is_nullable text,
    column_default text,
    fk_references text,
    on_delete text
)
LANGUAGE sql
AS $$
    SELECT
        c.column_name::text,
        c.data_type::text,
        c.character_maximum_length::int,
        c.is_nullable::text,
        c.column_default::text,
        fk.ref,
        fk.del
    FROM information_schema.columns c
    LEFT JOIN LATERAL (
        SELECT
            format('%s(%s)', con.confrelid::regclass, af.attname) AS ref,
            CASE con.confdeltype
                WHEN 'a' THEN 'NO ACTION'
                WHEN 'r' THEN 'RESTRICT'
                WHEN 'c' THEN 'CASCADE'
                WHEN 'n' THEN 'SET NULL'
                WHEN 'd' THEN 'SET DEFAULT'
            END AS del
        FROM pg_constraint con
        CROSS JOIN LATERAL unnest(con.conkey, con.confkey) AS k(src, dst)
        JOIN pg_attribute a  ON a.attrelid  = con.conrelid  AND a.attnum  = k.src
        JOIN pg_attribute af ON af.attrelid = con.confrelid AND af.attnum = k.dst
        WHERE con.contype = 'f'
          AND con.conrelid = to_regclass(format('%I', t))
          AND a.attname::text = c.column_name::text
        LIMIT 1
    ) fk ON true
    WHERE c.table_name = t
      AND c.table_schema = current_schema()
    ORDER BY c.ordinal_position;
$$;

SELECT * FROM describe('CustomerInvoiceLines');