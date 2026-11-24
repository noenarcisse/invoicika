package items

import (
	"dbinjector/internal/dataloader"
	_ "embed"
	"encoding/json"
	"errors"
)

func GetAll(state int) ([]Item, error) {

	jsondatasets, err := dataloader.LoadData(dataloader.Customers)
	if err != nil {
		return []Item{}, err
	}

	if state >= len(jsondatasets) {
		return []Item{}, errors.New("state off limit")
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
