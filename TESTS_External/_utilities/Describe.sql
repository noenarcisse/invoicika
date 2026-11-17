-- pas de describe en psql :<
DROP FUNCTION IF EXISTS describe(text);
CREATE OR REPLACE FUNCTION describe(t text)
RETURNS TABLE (
    column_name text,
    data_type text,
    character_maximum_length int,
    is_nullable text,
    column_default text
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.column_name::text, 
        c.data_type::text, 
        c.character_maximum_length::int, 
        c.is_nullable::text, 
        c.column_default::text
    FROM information_schema.columns c
    WHERE c.table_name = t;
END;
$$;

SELECT * FROM describe('Users')