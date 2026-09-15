package main

import (
	"dbinjector/internal/database"
	"dbinjector/internal/users"
	"dbinjector/internal/yamlparser"
)

func main() {

	dblogs, err := yamlparser.GetDBInfosFromYml("./docker-compose.yml")
	if err != nil {
		panic(err)
	}

	conn := database.OpenDB(dblogs)
	defer conn.Close()

	database.NewDB(conn).Trunc("Customers")
	cs, _ := users.GetAllUsers()
	users.NewDB(conn).InjectUsers(cs)
}
