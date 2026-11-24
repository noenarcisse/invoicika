package itemgroups

import (
	"dbinjector/internal/dataloader"
	_ "embed"
	"encoding/json"
	"errors"
)

func GetAll(state int) ([]ItemGroup, error) {

	jsondatasets, err := dataloader.LoadData(dataloader.Customers)
	if err != nil {
		return []ItemGroup{}, err
	}

	if state >= len(jsondatasets) {
		return []ItemGroup{}, errors.New("state off limit")
	}

	raw := []ItemGroup{}
	err = json.Unmarshal([]byte(jsondatasets[state]), &raw)
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
