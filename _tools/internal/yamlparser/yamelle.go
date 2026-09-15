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
// Highly concrete and bound to the format of the yml file
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

			if getPortLine {
				console.Printcln(console.BLUE, "Found PORT")
				dbLogs.Port, err = extractPort(line)
				if err != nil {
					return nil, err
				}
				break
			}

			if val, err, ok := tryFindValue(line, "USER"); ok {
				if err != nil {
					return nil, err
				}
				dbLogs.User = val
			}
			if val, err, ok := tryFindValue(line, "PASSWORD"); ok {
				if err != nil {
					return nil, err
				}
				dbLogs.Password = val
			}
			if val, err, ok := tryFindValue(line, "DB"); ok {
				if err != nil {
					return nil, err
				}
				dbLogs.Db = val
			}
			if strings.Contains(line, "ports") {
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

	return &dbLogs, nil
}

func tryFindValue(line string, word string) (string, error, bool) {
	ok := strings.Contains(line, word)
	var value string
	var err error
	if ok {
		console.Printcln(console.BLUE, "Found %s", word)
		value, err = extractVarData(line)
	}
	return value, err, ok
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
