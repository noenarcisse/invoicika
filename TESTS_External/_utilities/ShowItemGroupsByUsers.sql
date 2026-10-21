select g."Title", u."Username" from "ItemGroups" g
join "Users" u on u."UserId" = g."User_id"