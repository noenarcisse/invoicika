package main

import (
	"dbinjector/internal/database"
	"dbinjector/internal/users"
)

func main() {
	conn := database.OpenDB()
	defer conn.Close()

	database.NewDB(conn).Trunc("Customers")
	cs, _ := users.GetAllUsers()
	users.NewDB(conn).InjectUsers(cs)
}
