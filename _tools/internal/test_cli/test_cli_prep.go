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

func runStep(name string, args string) error {
	splet := strings.Split(args, " ")

	cmd := exec.Command(name, splet...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = console.ColoredWriter{C: console.RED, W: os.Stderr}

	return cmd.Run()
}

func Install() error {
	err := runStep("docker", "compose up --build")
	if err != nil {
		var exitErr *exec.ExitError
		if errors.As(err, &exitErr) {
			fmt.Println(exitErr.ExitCode())
		}
	}
	return err
}
func Remove() error {
	err := runStep("docker", "compose --progress auto down -v")
	if err != nil {
		var exitErr *exec.ExitError
		if errors.As(err, &exitErr) {
			fmt.Println(exitErr.ExitCode())
		}
	}

	return err
}

func ResetDB(dblogs *yamlparser.PsqlLogs) error {
	cmd := fmt.Sprintf("postgresql://%s:%s@localhost:%s/%s -f ./db_backups/Backup_invoicika_001.sql",
		dblogs.User,
		dblogs.Password,
		dblogs.Port,
		dblogs.Db,
	)
	err := runStep("psql", cmd)
	return err
}

// fallback ?
func ResetDB2() error {
	err := runStep("docker", "compose down -v")
	return err
}

// todo
// horrible l'acces map ici en direct sans check D:
func setDBState(dblogs *yamlparser.PsqlLogs, states map[int]string, state int) error {
	cmd := fmt.Sprintf("postgresql://%s:%s@localhost:%s/%s -f ./db_backups/Backup_invoicika_001.sql",
		dblogs.User,
		dblogs.Password,
		dblogs.Port,
		dblogs.Db,
	)
	err := runStep("psql", cmd+states[state])
	return err
}

// Backup_invoicika_001.sql
func ApplyBackupFile(dblogs *yamlparser.PsqlLogs, file string) error {

	if _, err := os.Open(file); err != nil {
		if errors.Is(err, os.ErrNotExist) {
			//absorbtion de errstack
			return fmt.Errorf("File not found: %s", file)
		}
	}

	cmd := fmt.Sprintf("postgresql://%s:%s@localhost:%s/%s -f ./db_backups/%s",
		dblogs.User,
		dblogs.Password,
		dblogs.Port,
		dblogs.Db,
		file,
	)
	err := runStep("psql", cmd)
	return err
}
