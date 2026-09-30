package main

import (
	"dbinjector/internal/customers"
	"dbinjector/internal/database"
	"dbinjector/internal/items"
	"dbinjector/internal/users"
	"dbinjector/internal/yamlparser"
	"dbinjector/pkg/console"
	"flag"
	"fmt"
	"os"
	"path/filepath"
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
	flag.IntVar(&cmd.Items, "items", -1, itemsmsg)
	flag.IntVar(&cmd.Items, "i", -1, itemsmsg)

	usersmsg := "Inject Users table in DB"
	flag.IntVar(&cmd.Users, "users", -1, usersmsg)
	flag.IntVar(&cmd.Users, "u", -1, usersmsg)

	flag.Parse()

	dir := os.Getenv("APP_DIR")
	if dir == "" {
		exe, _ := os.Executable()
		dir = filepath.Dir(exe)
	}

	fp := filepath.Join(dir, "docker-compose.yml")

	dblogs, err := yamlparser.GetDBInfosFromYml(fp)
	if err != nil {
		panic(err)
	}

	if cmd.Customers != -1 {
		switch cmd.Customers {
		case 0:
			conn := database.OpenDB(dblogs)
			defer conn.Close()

			database.NewDB(conn).Trunc("Customers")
			cs, _ := customers.GetAllCustomers()
			customers.NewDB(conn).InjectCustomers(cs)
		default:
			console.Printcln(console.RED, "DB injection not prepared for the state customers %d", cmd.Customers)
		}
	}

	if cmd.Items != -1 {
		switch cmd.Items {
		case 0:
			is, _ := items.GetAllItems()
			for _, u := range is {
				fmt.Printf("%+v\n", u)
				fmt.Println()
			}
			conn := database.OpenDB(dblogs)
			defer conn.Close()

			database.NewDB(conn).Trunc("Items")
			items.NewDB(conn).InjectItems(is)
		default:
			console.Printcln(console.RED, "DB injection not prepared for the state items %d", cmd.Items)
		}
	}

	if cmd.Users != -1 {
		switch cmd.Users {
		case 0:
			us, _ := users.GetAllUsers()
			for _, u := range us {
				fmt.Printf("%+v\n", u)
				fmt.Println()
			}
			conn := database.OpenDB(dblogs)
			defer conn.Close()

			database.NewDB(conn).Trunc("Users")
			users.NewDB(conn).InjectUsers(us)

		default:
			console.Printcln(console.RED, "DB injection not prepared for the stat users %d", cmd.Users)
		}
	}

}
