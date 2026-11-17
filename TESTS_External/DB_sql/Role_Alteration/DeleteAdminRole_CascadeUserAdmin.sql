-- Exploratory codes
begin;

select count(*) as admin_count
from "Users" 
where "Role_id" = (select "RoleId" from "Roles" where "RoleName" ~* 'admin');

delete from "Roles" where "RoleName" ~* 'admin';

rollback;

--
-- Manual test 
--

do $$
declare
  c1 int;
  c2 int;
  c3 int;
begin
  select count(*) into c1
  from "Users"
  where "Role_id" in (select "RoleId" from "Roles" where "RoleName" ~* 'admin');

  delete from "Roles" where "RoleName" ~* 'admin';

  select count(*) into c2
  from "Users"
  where "Role_id" in (select "RoleId" from "Roles" where "RoleName" ~* 'admin');

  select count(*) into c3
  from "Users"
  where "Role_id" is not null
    and "Role_id" not in (select "RoleId" from "Roles");

  raise exception '
  admin 
    avant: %, 
    apres: %
    orphelins: % 
    
    (rollback volontaire)', c1, c2, c3;
end $$;