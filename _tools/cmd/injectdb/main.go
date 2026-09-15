package main

import (
	"dbinjector/internal/database"
	"dbinjector/internal/users"
	"dbinjector/internal/yamlparser"
	"dbinjector/pkg/console"
	"flag"
)

type cmd struct {
	Users int
}

func main() {

	var cmd cmd

	flag.IntVar(&cmd.Users, "user", -1, "Inject users table in DB")
	flag.IntVar(&cmd.Users, "u", -1, "Inject users table in DB")

	flag.Parse()

	dblogs, err := yamlparser.GetDBInfosFromYml("./docker-compose.yml")
	if err != nil {
		panic(err)
	}

	if cmd.Users != -1 {
		switch cmd.Users {
		case 0:
			conn := database.OpenDB(dblogs)
			defer conn.Close()

			database.NewDB(conn).Trunc("Customers")
			cs, _ := users.GetAllUsers()
			users.NewDB(conn).InjectUsers(cs)
		default:
			console.Printcln(console.RED, "DB injection not prepared for the state %d", cmd.Users)
		}
	}

}
