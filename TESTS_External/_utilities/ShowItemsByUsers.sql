select 
	i."Name",
	u."Username" as "Creator: username"
from "Items" i
join 
	"Users" u on i."User_id" = u."UserId"