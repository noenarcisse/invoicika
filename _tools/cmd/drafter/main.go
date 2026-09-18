package main

import (
	"dbinjector/internal/parser"
	_ "embed"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"time"
)

//go:embed style.css
var css string

//go:embed template.html
var templateHtml string

type set[T comparable] = map[T]struct{}

type WalkerOptions struct {
	Extensions  set[string]
	IgnoredDirs set[string]
}

// catch les draft et todo dans les fichiers .md en particulier
// code concrete, internal tool only
func main() {

	args := os.Args[1:]
	if len(args) <= 0 {
		panic("Nop args missing :< Gimme folder!")
	}

	opt := WalkerOptions{
		Extensions: set[string]{
			".md": struct{}{},
		},
		IgnoredDirs: set[string]{
			".git":         struct{}{},
			".vscode":      struct{}{},
			"bin":          struct{}{},
			"obj":          struct{}{},
			"node_modules": struct{}{},
			".venv":        struct{}{},
			"__pycache__":  struct{}{},
		},
	}
	files, err := WalkThisWay(args[0], opt.Extensions, opt.IgnoredDirs)
	if err != nil {
		panic(err)
	}

	drafts := []parser.TodoLine{}

	for _, f := range files {
		fmt.Println(f)
		found := parser.GetAll(f)
		drafts = append(drafts, found...)
	}

	res := parser.CreateLog(drafts)
	parser.WriteToConsole(res)

	log := parser.CreateLogToHTML(drafts)
	t := time.Now()
	logfilename := fmt.Sprintf("drafts_%d", t.Unix())
	html2 := parser.PrepareHTMLContent(files, templateHtml, css, log, logfilename)
	err = parser.WriteToSpecialFile(html2, logfilename, "html")
	if err != nil {
		panic(err)
	}

}

// walks and retrieves files
func WalkThisWay(dir string, ext set[string], ignores set[string]) (files []string, err error) {

	err = filepath.WalkDir(dir, func(path string, d fs.DirEntry, err error) error {

		if err != nil {
			return err
		}

		if d.IsDir() {
			if _, ok := ignores[d.Name()]; ok {
				return filepath.SkipDir
			}
		} else {
			e := filepath.Ext(path)
			if _, ok := ext[e]; !ok {
				return nil
			}
			a, _ := filepath.Abs(path)
			files = append(files, a)
		}
		return nil
	})
	return
}
