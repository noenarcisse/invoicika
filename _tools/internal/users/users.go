package users

import (
	"database/sql"
	"time"

	"github.com/google/uuid"
)

type DB struct {
	*sql.DB
}

func NewDB(connection *sql.DB) *DB {
	return &DB{connection}
}

type Customer struct {
	CustomerId   uuid.UUID
	Name         string    `json:"name"`
	Address      string    `json:"address"`
	PhoneNumber  string    `json:"phone"`
	Email        string    `json:"email"`
	CreationDate time.Time //utc
	UpdateDate   time.Time //utc
}

func NewCustomer(name string, addr string, email string, phone string) *Customer {
	return &Customer{
		CustomerId:   uuid.New(),
		Name:         name,
		Address:      addr,
		Email:        email,
		PhoneNumber:  phone,
		CreationDate: time.Time{}.UTC(),
		UpdateDate:   time.Time{}.UTC(),
	}
}

func (db *DB) InjectUsers(cs []Customer) {
	for _, c := range cs {
		_, err := db.Exec("insert into \"Customers\"(\"CustomerId\", \"Name\", \"Address\", \"PhoneNumber\", \"Email\", \"CreationDate\", \"UpdateDate\" ) values($1,$2,$3,$4,$5,$6,$7)",
			c.CustomerId,
			c.Name,
			c.Address,
			c.PhoneNumber,
			c.Email,
			c.CreationDate,
			c.UpdateDate)
		if err != nil {
			panic(err)
		}
	}
}
