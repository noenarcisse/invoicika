package users

import (
	_ "embed"
	"encoding/json"
)

//go:embed data/users.json
var jasonUsers string

func GetAllUsers() ([]User, error) {

	raw := []User{}

	err := json.Unmarshal([]byte(jasonUsers), &raw)
	if err != nil {
		return nil, err
	}

	us := make([]User, 0)
	for _, ur := range raw {
		u := NewUser(ur.Username, ur.EmailAdress, ur.PasswordHash, ur.RoleName)
		us = append(us, *u)
	}

	return us, nil
}
