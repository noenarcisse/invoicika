package main

import (
	"dbinjector/internal/customers"
	"dbinjector/internal/database"
	"dbinjector/internal/itemgroups"
	"dbinjector/internal/items"
	"dbinjector/internal/users"
	vats "dbinjector/internal/vat"
	"dbinjector/internal/yamlparser"
	"dbinjector/pkg/console"
	"flag"
	"fmt"
	"os"
	"path/filepath"
)

type cmd struct {
	Customers  int
	Items      int
	Users      int
	ItemGroups int
	Vats       int
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

	groupsmsg := "Inject ItemGroups table in DB"
	flag.IntVar(&cmd.ItemGroups, "groups", -1, groupsmsg)
	flag.IntVar(&cmd.ItemGroups, "g", -1, groupsmsg)

	vatmsg := "Inject vat table in DB"
	flag.IntVar(&cmd.Vats, "vats", -1, vatmsg)
	flag.IntVar(&cmd.Vats, "v", -1, vatmsg)

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

			cs, _ := customers.GetAll(0)
			customers.NewDB(conn).InjectCustomers(cs)
		case 1:
			conn := database.OpenDB(dblogs)
			defer conn.Close()

			cs, _ := customers.GetAll(1)
			customers.NewDB(conn).InjectCustomers(cs)
		default:
			console.Printcln(console.RED, "DB injection not prepared for the state customers %d", cmd.Customers)
		}
	}

	if cmd.Items != -1 {
		switch cmd.Items {
		case 0:
			is, _ := items.GetAll(0)
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
			us, _ := users.GetAll(0)
			for _, u := range us {
				fmt.Printf("%+v\n", u)
				fmt.Println()
			}
			conn := database.OpenDB(dblogs)
			defer conn.Close()

			database.NewDB(conn).Trunc("Users")
			users.NewDB(conn).InjectUsers(us)
		case 1:
			us, _ := users.GetAll(1)
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

	if cmd.ItemGroups != -1 {
		switch cmd.ItemGroups {
		case 0:
			groups, _ := itemgroups.GetAll(0)
			for _, u := range groups {
				fmt.Printf("%+v\n", u)
				fmt.Println()
			}
			conn := database.OpenDB(dblogs)
			defer conn.Close()

			database.NewDB(conn).Trunc("ItemGroups")
			itemgroups.NewDB(conn).Inject(groups)

		default:
			console.Printcln(console.RED, "DB injection not prepared for the state ItemGroups %d", cmd.ItemGroups)
		}
	}

	if cmd.Vats != -1 {
		switch cmd.Vats {
		case 0:
			conn := database.OpenDB(dblogs)
			defer conn.Close()

			// database.NewDB(conn).Trunc("VATs")
			vats.NewDB(conn).InjectVATs(100)

		default:
			console.Printcln(console.RED, "DB injection not prepared for the state ItemGroups %d", cmd.ItemGroups)
		}
	}
}
