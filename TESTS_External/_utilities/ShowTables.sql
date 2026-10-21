-- SHOW TABLES en psql
-- ignore les tables de migrations ef et les pg_
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
  and table_name not ilike('__EF%')
ORDER BY table_name;