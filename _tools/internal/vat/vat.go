package vats

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/google/uuid"
)

type DB struct {
	*sql.DB
}

func NewDB(conn *sql.DB) *DB {
	return &DB{conn}
}

type VAT struct {
	VatId        uuid.UUID
	Percentage   float64 `json:"percentage"`
	CreationDate time.Time
}

func NewItem(percentage float64) *VAT {
	return &VAT{
		VatId:        uuid.New(),
		Percentage:   percentage,
		CreationDate: time.Now().UTC(),
	}
}

func (db DB) getIds() []uuid.UUID {

	ids := []uuid.UUID{}

	rows, err := db.Query("select \"VatId\" from \"VATs\"")
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		var id uuid.UUID
		err := rows.Scan(&id)
		if err != nil {
			panic(err)
		}

		fmt.Printf("ID: %v\n", id)

		ids = append(ids, id)

		if rows.Err() != nil {
			panic(rows.Err())
		}
	}

	return ids
}

func (db DB) InjectVATs(nb int) {

	for i := range nb {
		_, err := db.Exec("insert into \"VATs\"(\"VatId\", \"Percentage\", \"CreationDate\") values($1,$2,$3)",
			uuid.New(),
			float64(i)*0.5,
			time.Now().UTC(),
		)
		if err != nil {
			panic(err)
		}
	}

}
