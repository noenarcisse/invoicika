package main

import (
	"dbinjector/internal/netutils"
	testcli "dbinjector/internal/test_cli"
	"dbinjector/internal/yamlparser"
	"dbinjector/pkg/console"
	"flag"
	"fmt"
	"os"
)

func main() {

	var help, install, build, reset, delete bool

	//flag -h
	helpmsg := "Display help"
	flag.BoolVar(&help, "help", false, helpmsg)
	flag.BoolVar(&help, "h", false, helpmsg)
	//flag -i
	installmsg := "Install the project with Docker"
	flag.BoolVar(&install, "install", false, installmsg)
	flag.BoolVar(&install, "i", false, installmsg)
	//flag -b
	buildmsg := "Install the project with Docker with --build flag"
	flag.BoolVar(&build, "build", false, buildmsg)
	flag.BoolVar(&build, "b", false, buildmsg)
	//flag -d
	deletemsg := "Dismount the container with Docker"
	flag.BoolVar(&delete, "delete", false, deletemsg)
	flag.BoolVar(&delete, "d", false, deletemsg)
	//flag -r
	resetmsg := "Reset the state of the project"
	flag.BoolVar(&reset, "reset", false, resetmsg)
	flag.BoolVar(&reset, "r", false, resetmsg)

	flag.Parse()

	dblogs, err := yamlparser.GetDBInfosFromYml("./docker-compose.yml")
	if err != nil {
		//todo err management
		panic(err)
	}

	switch {
	case help:
		flag.PrintDefaults()
		os.Exit(0)

	case build:
		// ping internet ici, le dev a fait une dependance npm i dans son dockerfile
		// --build plante le front sans co
		if !netutils.Ping("https://www.sonarsource.com/products/sonarqube/downloads/") {
			console.Printcln(console.RED, "No internet connexion, Docker compose up with --build aborted")
			return
		}

		console.Printcln(console.BLUE, "Installing containers with --build option")
		err := testcli.Build()
		if err != nil {
			console.Printcln(console.RED, "Error happened while installing with Docker")
			fmt.Println(err.Error())
			return
		}
	case install:

		console.Printcln(console.BLUE, "Installing containers")
		err := testcli.Install()
		if err != nil {
			console.Printcln(console.RED, "Error happened while installing with Docker")
			fmt.Println(err.Error())
			return
		}

		err = testcli.TruncDB(dblogs)
		if err != nil {
			console.Printcln(console.RED, "TRUNC ERR:"+err.Error())
			os.Exit(1)
		}
		console.Printcln(console.GREEN, "\nDB emptied entirely, DONE!")
		err = testcli.ApplyBackupFile2(dblogs, "Backup_invoicika_002.sql")
		if err != nil {
			console.Printcln(console.RED, "Backup err:"+err.Error())
			os.Exit(1)
		}
		console.Printcln(console.GREEN, "DB state changed to 1, DONE!")

	case delete:
		console.Printcln(console.BLUE, "Removing containers")
		err := testcli.Remove()
		if err != nil {
			console.Printcln(console.RED, "Error happened while attempting to remove the containers with Docker")
			fmt.Println(err.Error())
			os.Exit(1)
		}

	case reset:
		console.Printcln(console.BLUE, "\nResetting DB to inital state")
		err := testcli.ResetDB(dblogs)
		if err != nil {
			console.Printcln(console.RED, err.Error())
			os.Exit(1)
		}
		console.Printcln(console.GREEN, "\nDB reset, DONE!")

	default:
		console.Printcln(console.RED, "ERROR ARGS")
		flag.PrintDefaults()
	}
}
