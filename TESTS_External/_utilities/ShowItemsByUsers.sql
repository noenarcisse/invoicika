select i."Name", u."Username" from "Items" i
join "Users" u on i."User_id" = u."UserId"