package main

import (
	"dbinjector/internal/customers"
	"dbinjector/internal/database"
	"dbinjector/internal/yamlparser"
	"dbinjector/pkg/console"
	"flag"
)

type cmd struct {
	Customers int
	Items     int
	Users     int
}

func main() {

	var cmd cmd

	customersrmsg := "Inject Customers table in DB"
	flag.IntVar(&cmd.Customers, "customers", -1, customersrmsg)
	flag.IntVar(&cmd.Customers, "c", -1, customersrmsg)

	itemsmsg := "Inject Customers table in DB"
	flag.IntVar(&cmd.Customers, "items", -1, itemsmsg)
	flag.IntVar(&cmd.Customers, "i", -1, itemsmsg)

	flag.Parse()

	dblogs, err := yamlparser.GetDBInfosFromYml("./docker-compose.yml")
	if err != nil {
		panic(err)
	}

	if cmd.Customers != -1 {
		switch cmd.Customers {
		case 0:
			conn := database.OpenDB(dblogs)
			defer conn.Close()

			database.NewDB(conn).Trunc("Customers")
			cs, _ := customers.GetAllUsers()
			customers.NewDB(conn).InjectUsers(cs)
		default:
			console.Printcln(console.RED, "DB injection not prepared for the state %d", cmd.Customers)
		}
	}

	if cmd.Items != -1 {
		switch cmd.Items {
		default:
			console.Printcln(console.RED, "DB injection not prepared for the state %d", cmd.Items)
		}
	}

	if cmd.Users != -1 {
		switch cmd.Users {
		default:
			console.Printcln(console.RED, "DB injection not prepared for the state %d", cmd.Users)
		}
	}

}
