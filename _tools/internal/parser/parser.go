package parser

import (
	"bufio"
	"os"

	"strings"
)

//opens file, find lines, caches them

func HasLineTodo(line string) bool {
	lower := strings.ToLower(line)
	return strings.Contains(lower, "draft") || strings.Contains(lower, "todo")
}

// Opens a file, look for TODOS comments and theirs trailing comments.
// Returns all lines founds and closes the file.
func GetAll(file string) (found []TodoLine) {
	handle, err := os.OpenFile(file, os.O_RDONLY, 0400)
	if err != nil {
		panic(err)
	}
	defer handle.Close()

	scan := bufio.NewScanner(handle)
	scan.Split(bufio.ScanLines)

	linenum := 1
	todo := TodoLine{
		File: file,
	}

	for scan.Scan() {

		line := scan.Text()

		if HasLineTodo(line) {
			todo.Line = line
			todo.LineNum = linenum
			found = append(found, todo)
		}

		if scan.Err() != nil {
			panic(scan.Err())
		}
		linenum++
	}
	return
}
