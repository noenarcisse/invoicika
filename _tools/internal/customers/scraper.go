package customers

import (
	"dbinjector/internal/dataloader"
	_ "embed"
	"encoding/json"
	"errors"
)

func GetAll(state int) ([]Customer, error) {

	jsondatasets, err := dataloader.LoadData(dataloader.Customers)
	if err != nil {
		return []Customer{}, err
	}

	if state >= len(jsondatasets) {
		return []Customer{}, errors.New("state off limit")
	}

	raw := []Customer{}

	err = json.Unmarshal([]byte(jsondatasets[state]), &raw)
	if err != nil {
		return nil, err
	}

	cs := make([]Customer, 0)
	for _, cr := range raw {
		c := NewCustomer(cr.Name, cr.Address, cr.Email, cr.PhoneNumber)
		cs = append(cs, *c)
	}

	return cs, nil
}
