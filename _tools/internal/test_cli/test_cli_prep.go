package testcli

import (
	"fmt"
	"os/exec"
	"strings"
)

func runStep(name string, args string) error {
	splet := strings.Split(args, " ")

	cmd := exec.Command(name, splet...)
	//hidden for now
	// cmd.Stdout = os.Stdout
	// cmd.Stderr = os.Stderr

	return cmd.Run()
}

func Install() error {
	err := runStep("docker", "compose up --build")
	return err
}

func ResetDB(env map[string]string) error {
	cmd := fmt.Sprintf("postgresql://%s:%s@localhost:%s/%s -f ./db_backups/Backup_invoicika_001.sql",
		env["DB_USER"], env["DB_PASSWORD"],
		env["DB_PORT"],
		env["DB_NAME"],
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
func setDBState(env map[string]string, states map[int]string, state int) error {
	cmd := fmt.Sprintf("postgresql://%s:%s@localhost:%s/%s -f ./db_backups/Backup_invoicika_001.sql",
		env["DB_USER"], env["DB_PASSWORD"],
		env["DB_PORT"],
		env["DB_NAME"],
	)
	err := runStep("psql", cmd+states[state])
	return err
}
