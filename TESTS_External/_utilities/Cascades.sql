WITH RECURSIVE chain AS (
    SELECT con.confrelid AS parent, con.conrelid AS child, con.conname, 1 AS depth
    FROM pg_constraint con
    WHERE con.contype = 'f' AND con.confdeltype = 'c'
      AND con.confrelid = to_regclass('"Roles"')
    UNION ALL
    SELECT con.confrelid, con.conrelid, con.conname, c.depth + 1
    FROM pg_constraint con
    JOIN chain c ON con.confrelid = c.child
    WHERE con.contype = 'f' AND con.confdeltype = 'c' AND c.depth < 10
)
SELECT depth, parent::regclass AS parent, child::regclass AS child, conname
FROM chain ORDER BY depth;