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
	Name         string
	Address      string
	PhoneNumber  string
	Email        string
	CreationDate time.Time //utc
	UpdateDate   time.Time //utc
}

func NewCustomer() *Customer {
	return &Customer{
		CustomerId:   uuid.New(),
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
