package items

import (
	"dbinjector/internal/dataloader"
	_ "embed"
	"encoding/json"
	"errors"
)

var ErrorStateOutOfBound = errors.New("state off limit")

func GetAll(state int) ([]Item, error) {

	jsondatasets, err := dataloader.LoadData(dataloader.Items)
	if err != nil {
		return []Item{}, err
	}

	if state >= len(jsondatasets) {
		return []Item{}, ErrorStateOutOfBound
	}

	raw := []Item{}

	err = json.Unmarshal([]byte(jsondatasets[state]), &raw)
	if err != nil {
		return nil, err
	}

	is := make([]Item, 0)
	for _, ir := range raw {
		i := NewItem(ir.Name, ir.Descr, ir.PurchasePrice, ir.SalePrice)
		is = append(is, *i)
	}

	return is, nil
}
