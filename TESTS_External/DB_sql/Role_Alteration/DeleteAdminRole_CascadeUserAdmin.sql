-- Exploratory codes
BEGIN;

SELECT COUNT(*) AS admin_count
FROM "Users" 
WHERE "Role_id" = (SELECT "RoleId" FROM "Roles" WHERE "RoleName" ~* 'admin');

DELETE FROM "Roles" WHERE "RoleName" ~* 'admin';

ROLLBACK;

--
-- Manual test 
--

do $$
DECLARE
  c1 INT;
  c2 INT;
  c3 INT;
BEGIN
  SELECT COUNT(*) INTO c1
  FROM "Users"
  WHERE "Role_id" IN (SELECT "RoleId" FROM "Roles" WHERE "RoleName" ~* 'admin');

  DELETE FROM "Roles" WHERE "RoleName" ~* 'admin';

  SELECT COUNT(*) INTO c2
  FROM "Users"
  WHERE "Role_id" IN (SELECT "RoleId" FROM "Roles" WHERE "RoleName" ~* 'admin');

  SELECT COUNT(*) INTO c3
  FROM "Users"
  WHERE "Role_id" IS NOT NULL
    AND "Role_id" NOT IN (SELECT "RoleId" FROM "Roles");

  raise exception '
  admin 
    avant: %, 
    apres: %
    orphelins: % 
    
    (ROLLBACK volontaire)', c1, c2, c3;
END $$;
