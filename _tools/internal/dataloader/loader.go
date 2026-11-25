package dataloader

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path"
	"path/filepath"
)

const DATAFOLDER = "./datasets"

type subfolder string

const (
	Customers  subfolder = "customers"
	Items      subfolder = "items"
	ItemGroups subfolder = "itemgroups"
	Users      subfolder = "users"
)

func LoadData(sub subfolder) (files []string, err error) {
	p := path.Join(DATAFOLDER, string(sub))
	d, err := os.ReadDir(p)
	if err != nil {
		if errors.Is(err, fs.ErrNotExist) {
			return files, fmt.Errorf("folder not found: %w", err)
		} else {
			return files, err
		}
	}

	for _, f := range d {
		fmt.Println(f.Name())
		if f.IsDir() {
			continue
		}
		fp := path.Join(p, f.Name())
		ext := filepath.Ext(fp)
		if ext != ".json" {
			continue
		}
		content, err := os.ReadFile(fp)
		if err != nil {
			return files, err
		}
		files = append(files, string(content))
	}
	return
}
