package main

import (
	"dbinjector/internal/database"
	testcli "dbinjector/internal/test_cli"
	"dbinjector/internal/users"
	"dbinjector/internal/yamlparser"
	"dbinjector/pkg/console"
	"flag"
	"fmt"
	"os"
)

func main() {

	var help, install, reset, delete bool
	var state int

	//flag -h
	flag.BoolVar(&help, "help", false, "Display help")
	flag.BoolVar(&help, "h", false, "Display help")
	//flag -i
	flag.BoolVar(&install, "install", false, "Install the project with Docker")
	flag.BoolVar(&install, "i", false, "Install the project with Docker")
	//flag -d
	flag.BoolVar(&delete, "delete", false, "Install the project with Docker")
	flag.BoolVar(&delete, "d", false, "Install the project with Docker")
	//flag -s
	flag.IntVar(&state, "state", 0, "Swap the state of the Database")
	flag.IntVar(&state, "s", 0, "Swap the state of the Database")
	//flag -r
	flag.BoolVar(&reset, "reset", false, "Reset the state of the project")
	flag.BoolVar(&reset, "r", false, "Reset the state of the project")

	flag.Parse()

	dblogs, err := yamlparser.GetDBInfosFromYml("./docker-compose.yml")
	if err != nil {
		panic(err)
	}

	switch {
	case help:
		console.Printcln(console.BLUE, "Not implemented")

	case install:
		console.Printcln(console.BLUE, "Installing containers")
		err := testcli.Install()
		if err != nil {
			console.Printcln(console.RED, "Error happened while installing with Docker")
			fmt.Println(err.Error())
			return
		}

	case delete:
		console.Printcln(console.BLUE, "Removing containers")
		err := testcli.Remove()
		if err != nil {
			console.Printcln(console.RED, "Error happened while attempting to remove the containers with Docker")
			fmt.Println(err.Error())
			return
		}

	case reset:
		console.Printcln(console.BLUE, "\nResetting DB to inital state")
		err := testcli.ResetDB(dblogs)
		if err != nil {
			console.Printcln(console.RED, err.Error())
			err := testcli.ResetDB2()
			if err != nil {
				console.Printcln(console.RED, err.Error())
				os.Exit(1)
			}
		}
		console.Printcln(console.GREEN, "\nDB reset, DONE!")

	case state != 0:
		console.Printcln(console.BLUE, "\nChanging DB state to %d", state)
		switch state {
		case 1:
			err := testcli.ResetDB(dblogs)
			if err != nil {
				err := testcli.ResetDB2()
				if err != nil {
					console.Printcln(console.RED, err.Error())
					os.Exit(1)
				}
			}
			conn := database.OpenDB(dblogs)
			defer conn.Close()

			database.NewDB(conn).Trunc("Customers")
			cs, _ := users.GetAllUsers()
			users.NewDB(conn).InjectUsers(cs)
			console.Printcln(console.GREEN, "\nDB state changed to %d, DONE!", state)

		case 2:
			err := testcli.ApplyBackupFile(dblogs, "Backup_invoicika_003.sql")
			if err != nil {
				console.Printcln(console.RED, err.Error())
				os.Exit(1)
			}
			console.Printcln(console.GREEN, "\nDB state changed to %d, DONE!", state)

		default:
			console.Printcln(console.RED, "State not implemented yet")
		}
	default:
		//unreachable with current flag parse
	}
}
