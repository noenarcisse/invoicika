package users

import (
	_ "embed"
	"encoding/json"
)

//go:embed data/users.json
var jasonUsers string

func GetAllUsers() ([]Customer, error) {

	raw := []Customer{}

	err := json.Unmarshal([]byte(jasonUsers), &raw)
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
