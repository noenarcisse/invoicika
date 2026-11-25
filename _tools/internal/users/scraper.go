package users

import (
	"dbinjector/internal/dataloader"
	_ "embed"
	"encoding/json"
	"errors"
)

var ErrorStateOutOfBound = errors.New("state off limit")

func GetAll(state int) ([]User, error) {

	jsondatasets, err := dataloader.LoadData(dataloader.Users)
	if err != nil {
		return []User{}, err
	}

	if state >= len(jsondatasets) {
		return []User{}, ErrorStateOutOfBound
	}
	raw := []User{}

	err = json.Unmarshal([]byte(jsondatasets[state]), &raw)
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

// func GetAll2() ([]User, error) {

// 	fmt.Println(2)

// 	raw := []User{}

// 	err := json.Unmarshal([]byte(jasonUsers2), &raw)
// 	if err != nil {
// 		return nil, err
// 	}

// 	us := make([]User, 0)
// 	for _, ur := range raw {
// 		u := NewUser(ur.Username, ur.EmailAdress, ur.PasswordHash, ur.RoleName)
// 		us = append(us, *u)
// 	}

// 	return us, nil
// }
