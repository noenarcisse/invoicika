update "Roles" set "RoleName" = 'Employé' where "RoleName" = 'Employee';
-- could also use this but there is a FK contraints that may block if an invoice has been created with said Employee role
-- delete from "Roles" where "RoleName" = 'Employee'

select * from "Roles";