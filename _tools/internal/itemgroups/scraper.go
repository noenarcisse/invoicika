package itemgroups

import (
	_ "embed"
	"encoding/json"
)

//go:embed data/itemgroups.json
var jasonItems string

func GetAll() ([]ItemGroup, error) {

	raw := []ItemGroup{}

	err := json.Unmarshal([]byte(jasonItems), &raw)
	if err != nil {
		return nil, err
	}

	groups := make([]ItemGroup, 0)
	for _, gr := range raw {
		g := NewItemGroup(gr.Title, gr.Descr)
		groups = append(groups, *g)
	}

	return groups, nil
}
