package main

import (
	"dbinjector/internal/yamlparser"
	"fmt"
)

func main() {
	dblog, err := yamlparser.GetDBInfosFromYml("./docker-compose.yml")
	if err != nil {
		panic(err)
	}

	fmt.Printf("%+v\n", dblog)
}
