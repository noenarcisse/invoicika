package yamlparser

import (
	"bufio"
	"dbinjector/pkg/console"
	"errors"
	"fmt"
	"os"
	"strings"
	"unicode"
)

// see https://github.com/yaml/go-yaml
// if requires more leg work

type PsqlLogs struct {
	User     string
	Password string
	Db       string
	Port     string
}

// Poor man's yml extraction
func GetDBInfosFromYml(file string) (*PsqlLogs, error) {

	dbLogs := PsqlLogs{}

	handle, err := os.Open(file) //todo err to deal with
	if err != nil {
		if os.IsNotExist(err) {
			return nil, fmt.Errorf("File not found: %s. %w", file, err)
		}
		return nil, err
	}
	defer handle.Close()

	console.Printcln(console.GREEN, "Found YML file: %s", file)
	console.Printcln(console.GREEN, "Opened YML file %s looking for DB logging infos", handle.Name())

	scanner := bufio.NewScanner(handle)
	scanner.Split(bufio.ScanLines)

	startparsing := false
	getPortLine := false

	for scanner.Scan() {

		line := scanner.Text()

		if startparsing {
			switch {
			case getPortLine:
				console.Printcln(console.BLUE, "Found PORT")
				dbLogs.Port, err = extractPort(line)
				if err != nil {
					return nil, err
				}
				// todo rm this, go with ifs
				goto end //breaks from switch && scan loops
			case strings.Contains(line, "USER"):
				console.Printcln(console.BLUE, "Found USER")
				dbLogs.User, err = extractVarData(line)
				if err != nil {
					return nil, err
				}
			case strings.Contains(line, "PASSWORD"):
				console.Printcln(console.BLUE, "Found PASSWORD")

				dbLogs.Password, err = extractVarData(line)
				if err != nil {
					return nil, err
				}
			case strings.Contains(line, "DB"):
				console.Printcln(console.BLUE, "Found DB")

				dbLogs.Db, err = extractVarData(line)
				if err != nil {
					return nil, err
				}
			case strings.Contains(line, "ports"):
				// if port is found, grabs next line
				getPortLine = true
			}
		}
		// if db is seen, grabs the keys
		if strings.Contains(line, "db:") {
			startparsing = true
		}

		if scanner.Err() != nil {
			return nil, scanner.Err()
		}
	}

end:

	return &dbLogs, nil
}

// Extracts the value from a key in a yml file
func extractVarData(line string) (string, error) {
	_, after, ok := strings.Cut(line, "=")
	if !ok {
		return "", errors.New("Missing separator '='")
	}
	val := strings.Trim(after, " ")
	if val == "" {
		return "", errors.New("Empty val")
	}
	return val, nil
}

// Extracts PORT local value from the yml
func extractPort(line string) (string, error) {
	before, _, ok := strings.Cut(line, ":")
	if !ok {
		return "", errors.New("Missing separator ':'")
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

	//defensif, m peut jamais etre -1
	if n == -1 || m == -1 {
		return "", errors.New("No digit found !")
	}
	return before[n:m], nil
}
