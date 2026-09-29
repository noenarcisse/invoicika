package main

import (
	"dbinjector/internal/users"
	"fmt"
)

func main() {

	u := users.NewUser("John", "j@gmail.com", "url.jpg", "admin1")
	fmt.Printf("%+v\n", u)
	fmt.Println()

	us, _ := users.GetAllUsers()
	for _, u := range us {
		fmt.Printf("%+v\n", u)
		fmt.Println()
	}

	// dblog, err := yamlparser.GetDBInfosFromYml("./docker-compose.yml")
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Printf("%+v\n", dblog)
}
