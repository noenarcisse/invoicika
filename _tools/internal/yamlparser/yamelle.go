package yamlparser

import (
	"bufio"
	"errors"
	"fmt"
	"os"
	"strings"
	"unicode"
)

type psqlLogs struct {
	User     string
	Password string
	Db       string
	Port     string
}

func Test() {

	dbLogs := psqlLogs{}

	handle, err := os.Open("../docker-compose.yml") //todo err to deal with
	if err != nil {
		panic(err)
	}
	defer handle.Close()
	fmt.Println("Opened file: " + handle.Name())

	scanner := bufio.NewScanner(handle)
	scanner.Split(bufio.ScanLines)
	linenum := 1

	startparsing := false
	getPortLine := false

	for scanner.Scan() {

		line := scanner.Text()

		if startparsing {
			switch {
			case getPortLine:
				dbLogs.Port, err = extractPort(line)
				if err != nil {
					panic(err)
				}
				goto end //breaks from switch && scan loops
			case strings.Contains(line, "USER"):
				dbLogs.User = extractVarData(line)
			case strings.Contains(line, "PASSWORD"):
				dbLogs.Password = extractVarData(line)
			case strings.Contains(line, "DB"):
				dbLogs.Db = extractVarData(line)
			case strings.Contains(line, "ports"):
				getPortLine = true
			}
		}

		if strings.Contains(line, "db:") {
			fmt.Printf("FOUND AT %d\n", linenum)
			startparsing = true
		}

		linenum++

		if scanner.Err() != nil {
			panic(scanner.Err())
		}
	}

end:

	fmt.Printf("%+v", dbLogs)
}

// todo guards, rough for now
func extractVarData(line string) string {
	splet := strings.Split(line, "=")
	return strings.Trim(splet[1], " ")
}

// TODO : oof refacto
func extractPort(line string) (string, error) {
	before, _, ok := strings.Cut(line, ":")
	if !ok {
		return "", errors.New("AIE pas de sep")
	}
	n, m := -1, -1
	for i, c := range []rune(before) {

		if unicode.IsDigit(c) {
			if n == -1 {
				n = i
			}
			m = i + 1
		}
	}
	return before[n:m], nil
}
