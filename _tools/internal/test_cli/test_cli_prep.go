package testcli

import (
	"dbinjector/internal/yamlparser"
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
