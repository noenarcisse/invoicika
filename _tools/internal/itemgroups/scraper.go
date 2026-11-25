package itemgroups

import (
	"dbinjector/internal/dataloader"
	_ "embed"
	"encoding/json"
	"errors"
)

var ErrorStateOutOfBound = errors.New("state off limit")

func GetAll(state int) ([]ItemGroup, error) {

	jsondatasets, err := dataloader.LoadData(dataloader.ItemGroups)
	if err != nil {
		return []ItemGroup{}, err
	}

	if state >= len(jsondatasets) {
		return []ItemGroup{}, ErrorStateOutOfBound
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
