package users

import (
	_ "embed"
	"encoding/json"
	"fmt"
)

//go:embed data/users.json
var jasonUsers string

//go:embed data/users2.json
var jasonUsers2 string

func GetAll() ([]User, error) {

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

func GetAll2() ([]User, error) {

	fmt.Println(2)

	raw := []User{}

	err := json.Unmarshal([]byte(jasonUsers2), &raw)
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
