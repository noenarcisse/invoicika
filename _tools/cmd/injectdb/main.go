package main

import (
	"dbinjector/internal/customers"
	"dbinjector/internal/database"
	"dbinjector/internal/itemgroups"
	"dbinjector/internal/items"
	"dbinjector/internal/users"
	"dbinjector/internal/vats"
	"dbinjector/internal/yamlparser"
	"dbinjector/pkg/console"
	"errors"
	"flag"
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

	itemsmsg := "Inject Items table in DB"
	flag.IntVar(&cmd.Items, "items", -1, itemsmsg)
	flag.IntVar(&cmd.Items, "i", -1, itemsmsg)

	usersmsg := "Inject Users table in DB"
	flag.IntVar(&cmd.Users, "users", -1, usersmsg)
	flag.IntVar(&cmd.Users, "u", -1, usersmsg)

	groupsmsg := "Inject ItemGroups table in DB"
	flag.IntVar(&cmd.ItemGroups, "groups", -1, groupsmsg)
	flag.IntVar(&cmd.ItemGroups, "g", -1, groupsmsg)

	vatmsg := "Inject VAT table in DB"
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

	if cmd.Customers > -1 {
		conn := database.OpenDB(dblogs)
		defer conn.Close()

		cs, err := customers.GetAll(cmd.Customers)

		if err != nil {
			if errors.Is(err, customers.ErrorStateOutOfBound) {
				console.Printcln(console.RED, "DB injection not prepared for the state customers %d", cmd.Customers)
			} else {
				console.Printcln(console.RED, err.Error())
			}
			os.Exit(1)
		}
		customers.NewDB(conn).InjectCustomers(cs)
	}

	if cmd.Items > -1 {

		is, err := items.GetAll(cmd.Items)
		if err != nil {
			if errors.Is(err, items.ErrorStateOutOfBound) {
				console.Printcln(console.RED, "DB injection not prepared for the state items %d", cmd.Items)
			} else {
				console.Printcln(console.RED, err.Error())
			}
			os.Exit(1)
		}

		conn := database.OpenDB(dblogs)
		defer conn.Close()
		items.NewDB(conn).InjectItems(is)

	}

	if cmd.Users > -1 {

		us, err := users.GetAll(cmd.Users)
		if err != nil {
			if errors.Is(err, users.ErrorStateOutOfBound) {
				console.Printcln(console.RED, "DB injection not prepared for the state users %d", cmd.Users)
			} else {
				console.Printcln(console.RED, err.Error())
			}
			os.Exit(1)
		}

		conn := database.OpenDB(dblogs)
		defer conn.Close()
		users.NewDB(conn).InjectUsers(us)
	}

	if cmd.ItemGroups > -1 {

		groups, err := itemgroups.GetAll(cmd.ItemGroups)
		if err != nil {
			if errors.Is(err, itemgroups.ErrorStateOutOfBound) {
				console.Printcln(console.RED, "DB injection not prepared for the state itemGroups %d", cmd.ItemGroups)
			} else {
				console.Printcln(console.RED, err.Error())
			}
			os.Exit(1)
		}

		conn := database.OpenDB(dblogs)
		defer conn.Close()
		itemgroups.NewDB(conn).Inject(groups)

	}

	if cmd.Vats > -1 {
		switch cmd.Vats {
		case 0:
			conn := database.OpenDB(dblogs)
			defer conn.Close()
			vats.NewDB(conn).InjectVATs(100)

		default:
			console.Printcln(console.RED, "DB injection not prepared for the state VATs %d", cmd.ItemGroups)
		}
	}
}
