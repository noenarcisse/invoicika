package customers

import (
	_ "embed"
	"encoding/json"
	"errors"
)

//go:embed data/customers.json
var jasonCustomers string

//go:embed data/customers100.json
var jasonCustomers100 string

func GetAllCustomers(state int) ([]Customer, error) {
	jsondatasets := []string{jasonCustomers, jasonCustomers100}

	if state >= len(jsondatasets) {
		return []Customer{}, errors.New("state off limit")
	}

	raw := []Customer{}

	err := json.Unmarshal([]byte(jsondatasets[state]), &raw)
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
