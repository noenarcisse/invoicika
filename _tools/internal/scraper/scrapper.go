package scraper

import (
	"dbinjector/internal/users"
	_ "embed"
	"encoding/json"
)

//go:embed data/users.json
var jasonUsers string

func GetAllUsers() ([]users.Customer, error) {

	r := []users.Customer{}

	err := json.Unmarshal([]byte(jasonUsers), &r)
	if err != nil {
		return nil, err
	}
	return r, nil
}
