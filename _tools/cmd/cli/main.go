package main

import (
	"dbinjector/internal/database"
	testcli "dbinjector/internal/test_cli"
	"dbinjector/internal/users"
	"dbinjector/pkg/dotenv"
	"flag"
	"fmt"
)

func main() {

	var help, install, reset bool
	var state int

	//flag -h
	flag.BoolVar(&help, "help", false, "Display help")
	flag.BoolVar(&help, "h", false, "Display help")
	//flag -i
	flag.BoolVar(&install, "install", false, "Install the project with Docker")
	flag.BoolVar(&install, "i", false, "Install the project with Docker")
	//flag -s
	flag.IntVar(&state, "state", 0, "Swap the state of the Database")
	flag.IntVar(&state, "s", 0, "Swap the state of the Database")
	//flag -r
	flag.BoolVar(&reset, "reset", false, "Reset the state of the project")
	flag.BoolVar(&reset, "r", false, "Reset the state of the project")

	flag.Parse()

	env, err := dotenv.NewDotEnvFile(".env")
	if err != nil {
		panic(err)
	}

	envVars, notfound, err := env.PickKeys(
		"DB_PORT",
		"DB_USER",
		"DB_PASSWORD",
		"DB_NAME",
	)
	if err != nil {
		panic(err)
	}
	if len(notfound) > 0 {
		panic("No environment vars found in the .env")
	}

	switch {
	case help:
		fmt.Println("Show help")

	case install:
		fmt.Println("Show install")
		testcli.Install() //untested

	case reset:
		fmt.Println("Resetting DB")
		err := testcli.ResetDB(envVars)
		if err != nil {
			err := testcli.ResetDB2()
			if err != nil {
				panic(err)
			}
		}
	case state != 0:
		fmt.Printf("Changing DB state to %d\n", state)
		switch state {
		case 1:
			err := testcli.ResetDB(envVars)
			if err != nil {
				err := testcli.ResetDB2()
				if err != nil {
					panic(err)
				}
			}
			conn := database.OpenDB()
			defer conn.Close()

			database.NewDB(conn).Trunc("Customers")
			cs, _ := users.GetAllUsers()
			users.NewDB(conn).InjectUsers(cs)

		default:
			fmt.Println("State not implemented yet")
		}
	default:
		//unreachable with current flag parse
	}
}
