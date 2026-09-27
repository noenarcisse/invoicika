package testcli

import (
	"dbinjector/internal/yamlparser"
	"dbinjector/pkg/console"

	"errors"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

// le nom du service du docker-compose "db" est hardcodé

// Console options to redirect stdout and stderr
type options struct {
	WithOuts bool
	WithErrs bool
}

func runStep(name string, args string, opt options) error {
	splet := strings.Split(args, " ")

	cmd := exec.Command(name, splet...)
	if opt.WithOuts {
		fmt.Println(name + " LOGS: ")
		cmd.Stdout = os.Stdout
	}
	if opt.WithErrs {
		console.Printcln(console.YELLOW, name+" ERRS: ")
		// cmd.Stderr = os.Stderr
		cmd.Stderr = console.ColoredWriter{C: console.YELLOW, W: os.Stderr}
	}

	return cmd.Run()
}

// Install the containers without building dependencies
func Install() error {
	err := runStep("docker", "compose up -d", options{true, true})
	if err != nil {
		if perr, ok := errors.AsType[*exec.ExitError](err); ok {
			fmt.Println(perr.ExitCode())
		}
	}
	return err
}

// Install the containers and build the dependencies listed in the Dockerfiles
func Build() error {
	err := runStep("docker", "compose up -d --build", options{true, true})
	if err != nil {
		if perr, ok := errors.AsType[*exec.ExitError](err); ok {
			fmt.Println(perr.ExitCode())
		}
	}
	return err
}

// Dismount all the containers from the project and delete the volumes.
func Remove() error {
	//ne throw rien si la cmd ne fait rien ?! ne pas dismount = pas d'err selon docker?!
	//aucun message en console ni out ni err :/
	err := runStep("docker", "compose down -v", options{true, true})
	if err != nil {
		if perr, ok := errors.AsType[*exec.ExitError](err); ok {
			fmt.Println(perr.ExitCode())
		}
	}
	return err
}

// Reset the database to its original state. Dataset comes from the early fork, from the inital dev of the app.
func ResetDB(dblogs *yamlparser.PsqlLogs) error {
	return ApplyBackupFile2(dblogs, "Backup_invoicika_001.sql")
}

// Wipe the data from the database.
func TruncDB(dblogs *yamlparser.PsqlLogs) error {
	return ApplyBackupFile2(dblogs, "truncdb.sql")
}

// todo prep a tester + gestion d'err
func ApplyBackupFile2(dblogs *yamlparser.PsqlLogs, file string) error {

	fullfilepath := fmt.Sprintf(".%s%s", BACKUP_FOLDER, file)

	if _, err := os.Stat(fullfilepath); err != nil {
		if errors.Is(err, os.ErrNotExist) {
			//absorbtion de errstack
			return fmt.Errorf("File not found in the %s folder: %s", BACKUP_FOLDER, file)
		}
	}

	//service name is db ?!
	cmd1 := fmt.Sprintf("compose cp %s db:/tmp/%s",
		fullfilepath,
		file,
	)
	err := runStep("docker", cmd1, options{false, false})
	if err != nil {
		return err
	}

	cmd2 := fmt.Sprintf("compose exec db psql -U %s -d %s -f /tmp/%s",
		dblogs.User,
		dblogs.Db,
		file,
	)

	err = runStep("docker", cmd2, options{false, false})
	if err != nil {
		return err
	}

	cmd3 := fmt.Sprintf("compose exec db rm /tmp/%s",
		file,
	)
	err = runStep("docker", cmd3, options{false, false})
	if err != nil {
		return err
	}
	return err
}

//-------------------------------------
//OLD to be RM ?

// Directly apply a backup file with psql cmd
// -> Passage par le psql de la machine locale, casse parfois sur l'init du container
// -> c'est okay pour travailler avec psql en local, avec docker c'est pas la meilleur idée
// -> ca peut etre deshydraté en vrai c'est utile comme methode, juste pas pour ce proj
func ApplyBackupFile(dblogs *yamlparser.PsqlLogs, file string) error {

	fullfilepath := fmt.Sprintf(".%s%s", BACKUP_FOLDER, file)

	if _, err := os.Stat(fullfilepath); err != nil {
		if errors.Is(err, os.ErrNotExist) {
			//absorbtion de errstack
			return fmt.Errorf("File not found in the %s folder: %s", BACKUP_FOLDER, file)
		}
	}

	cmd := fmt.Sprintf("postgresql://%s:%s@localhost:%s/%s -f %s",
		dblogs.User,
		dblogs.Password,
		dblogs.Port,
		dblogs.Db,
		fullfilepath,
	)
	err := runStep("psql", cmd, options{false, true})
	return err
}
