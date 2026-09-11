package main

import (
	"dbinjector/internal/database"
	"dbinjector/internal/users"
)

func main() {
	conn := database.OpenDB()
	defer conn.Close()

	database.NewDB(conn).Trunc("Customers")

	c := users.NewCustomer()
	c.Name = "Jean-Pierre Polnareff"
	c.Address = "France"
	c.PhoneNumber = "+33 456 77 44"
	c.Email = "jpp@gmail.com"

	users.NewDB(conn).InjectUsers([]users.Customer{*c})
}
