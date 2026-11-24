package main

import (
	"dbinjector/internal/dataloader"
	"fmt"
)

func main() {
	fileContents, err := dataloader.LoadData(dataloader.Customers)
	if err != nil {
		panic(err)
	}

	fmt.Println(len(fileContents))

	for _, c := range fileContents {
		fmt.Println(c)
	}

	// u := users.NewUser("John", "j@gmail.com", "url.jpg", "admin1")
	// fmt.Printf("%+v\n", u)
	// fmt.Println()

	// us, _ := users.GetAll()
	// for _, u := range us {
	// 	fmt.Printf("%+v\n", u)
	// 	fmt.Println()
	// }

	// dblog, err := yamlparser.GetDBInfosFromYml("./docker-compose.yml")
	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Printf("%+v\n", dblog)
}
