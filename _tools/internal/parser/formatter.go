package parser

import (
	"html"

	"fmt"
	"strconv"
	"strings"
)

func ToConsole(tl TodoLine) string {
	sb := strings.Builder{}

	sb.WriteString(tl.File)
	sb.WriteString(":")
	sb.WriteString(strconv.Itoa(tl.LineNum))
	sb.WriteString(" : \n")

	sb.WriteString(strconv.Itoa(tl.LineNum))
	sb.WriteString(" : ")
	sb.WriteString(tl.Line)
	sb.WriteString("\n")

	return sb.String()
}

func ToHTML(tl TodoLine) string {
	sb := strings.Builder{}

	//vscode://
	filename := fmt.Sprintf("<a href=\"vscode://file/%s:%s\">%s:%s</a>",
		html.EscapeString(tl.File),
		strconv.Itoa(tl.LineNum),
		html.EscapeString(tl.File),
		strconv.Itoa(tl.LineNum))
	sb.WriteString("<div>\n")
	sb.WriteString("📄 ")
	sb.WriteString(filename)
	sb.WriteString("<br/>\n")
	sb.WriteString("<code>")

	sb.WriteString("<br/>\n")
	sb.WriteString(strconv.Itoa(tl.LineNum))
	sb.WriteString("   ")
	sb.WriteString(html.EscapeString(tl.Line))

	sb.WriteString("</code>")
	sb.WriteString("</div>\n")
	return sb.String()
}
