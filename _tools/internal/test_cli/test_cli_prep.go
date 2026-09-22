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
		cmd.Stderr = os.Stderr
		// cmd.Stderr = console.ColoredWriter{C: console.YELLOW, W: os.Stderr}
	}

	return cmd.Run()
}

func Install() error {
	err := runStep("docker", "compose up -d --build", options{true, true})
	if err != nil {
		var exitErr *exec.ExitError
		if errors.As(err, &exitErr) {
			fmt.Println(exitErr.ExitCode())
		}
	}
	return err
}
func Remove() error {
	//ne throw rien si la cmd ne fait rien ?! ne pas dismount = pas d'err selon docker?!
	//aucun message en console ni out ni err :/
	err := runStep("docker", "compose down -v", options{true, true})
	if err != nil {
		var exitErr *exec.ExitError
		if errors.As(err, &exitErr) {
			fmt.Println(exitErr.ExitCode())
		}
	}

	return err
}

func ResetDB(dblogs *yamlparser.PsqlLogs) error {
	return ApplyBackupFile(dblogs, "Backup_invoicika_001.sql")
}

// fallback ?
func ResetDB2() error {
	err := runStep("docker", "compose down -v", options{true, true})
	return err
}

// Directly apply a backup file with psql cmd
func ApplyBackupFile(dblogs *yamlparser.PsqlLogs, file string) error {

	backupfolderpath := "/db_backups/"
	fullfilepath := fmt.Sprintf(".%s%s", backupfolderpath, file)

	if _, err := os.Stat(fullfilepath); err != nil {
		if errors.Is(err, os.ErrNotExist) {
			//absorbtion de errstack
			return fmt.Errorf("File not found in the %s folder: %s", backupfolderpath, file)
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
