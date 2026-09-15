package console

import (
	"fmt"
	"io"
	"strings"
)

type Color string

const (
	reset  Color = "\033[0m"
	RED    Color = "\033[31m"
	GREEN  Color = "\033[32m"
	YELLOW Color = "\033[33m"
	BLUE   Color = "\033[34m"
)

type ColoredWriter struct {
	C Color
	W io.Writer
}

func Printc(color Color, format string, a ...any) {
	sb := strings.Builder{}
	sb.WriteString(string(color))
	sb.WriteString(format)
	sb.WriteString(string(reset))
	fmt.Printf(sb.String(), a...)
}

func Printcln(color Color, format string, a ...any) {
	sb := strings.Builder{}
	sb.WriteString(string(color))
	sb.WriteString(format)
	sb.WriteString("\n")
	sb.WriteString(string(reset))
	fmt.Printf(sb.String(), a...)
}

func (cw ColoredWriter) Write(b []byte) (int, error) {
	fmt.Fprint(cw.W, cw.C)
	n, err := cw.W.Write(b)
	fmt.Fprint(cw.W, reset)
	return n, err
}
