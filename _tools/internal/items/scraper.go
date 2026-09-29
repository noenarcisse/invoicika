package items

import (
	_ "embed"
	"encoding/json"
)

//go:embed data/items.json
var jasonItems string

func GetAllItems() ([]Item, error) {

	raw := []Item{}

	err := json.Unmarshal([]byte(jasonItems), &raw)
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
