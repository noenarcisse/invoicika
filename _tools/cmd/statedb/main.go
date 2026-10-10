package statedb

import (
	"dbinjector/internal/customers"
	"dbinjector/internal/database"
	testcli "dbinjector/internal/test_cli"
	"dbinjector/internal/yamlparser"
	"dbinjector/pkg/console"
	"os"
	"strconv"
)

// requiert docker et psql ? y'a un ApplyDbBackup en v1 ici
func main() {

	// statemsg := "Swap the state of the Database"

	args := os.Args[1:]

	if len(args) < 1 {
		panic("Err args, state required")
	}

	state, err := strconv.Atoi(args[0])
	if err != nil {
		panic("Couldn't parse int value from the state entered")
	}

	dblogs, err := yamlparser.GetDBInfosFromYml("./docker-compose.yml")
	if err != nil {
		//todo err management
		panic(err)
	}
	console.Printcln(console.BLUE, "\nChanging DB state to %d", state)
	switch state {

	case 1:
		err := testcli.ResetDB(dblogs)
		if err != nil {
			console.Printcln(console.RED, err.Error())
			os.Exit(1)
		}
		conn := database.OpenDB(dblogs)
		defer conn.Close()

		database.NewDB(conn).Trunc("Customers")
		cs, _ := customers.GetAllCustomers()
		customers.NewDB(conn).InjectCustomers(cs)
		console.Printcln(console.GREEN, "\nDB state changed to %d, DONE!", state)

	case 2:
		//todo : is this normal behavior? requires psql for no other reason than this line
		err := testcli.ApplyBackupFile(dblogs, "Backup_invoicika_003.sql")
		if err != nil {
			console.Printcln(console.RED, err.Error())
			os.Exit(1)
		}
		console.Printcln(console.GREEN, "\nDB state changed to %d, DONE!", state)

	default:
		console.Printcln(console.RED, "State not implemented yet")
	}

}
