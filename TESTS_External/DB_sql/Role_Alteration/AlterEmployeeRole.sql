UPDATE "Roles" set "RoleName" = 'Employé' WHERE "RoleName" = 'Employee';
-- could also use this but there IS a FK contraints that may block IF an invoice has been created WITH said Employee role
-- DELETE FROM "Roles" WHERE "RoleName" = 'Employee'
SELECT * FROM "Roles";
