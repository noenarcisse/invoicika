package parser

import (
	"fmt"
)

type TodoLine struct {
	File    string //abs filepath ref
	Line    string // line
	LineNum int    // number
}

func (tl TodoLine) String() string {
	return fmt.Sprintf(`FILE : 
Filepath : %s
Lines : %v
Todo Line num : %d`,
		tl.File, tl.Line, tl.LineNum)
}
