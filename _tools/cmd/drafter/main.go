package main

import (
	"dbinjector/internal/parser"
	"fmt"
	"io/fs"
	"path/filepath"
)

type set[T comparable] = map[T]struct{}

type WalkerOptions struct {
	Extensions  set[string]
	IgnoredDirs set[string]
}

// catch les draft et todo dans les fichiers .md en particulier
// code concrete, internal tool
func main() {

	opt := WalkerOptions{
		Extensions: set[string]{
			".md": struct{}{},
		},
		IgnoredDirs: set[string]{
			".git":         struct{}{},
			"node_modules": struct{}{},
			"bin":          struct{}{},
			"obj":          struct{}{},
		},
	}
	files, err := WalkThisWay("..", opt.Extensions, opt.IgnoredDirs)
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
