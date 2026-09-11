package database

import (
	"database/sql"
	"dbinjector/pkg/dotenv"
	"fmt"

	"github.com/lib/pq"
)

type DB struct {
	*sql.DB
}

func NewDB(connection *sql.DB) *DB {
	return &DB{connection}
}

func OpenDB() *sql.DB {
	env, err := dotenv.NewDotEnvFile(".env")
	if err != nil {
		panic(err)
	}

	found, notfound, err := env.PickKeys(
		"DB_PORT",
		"DB_USER",
		"DB_PASSWORD",
		"DB_NAME",
	)
	if err != nil {
		panic(err)
	}
	if len(notfound) > 0 {
		panic("NOOOOOON")
	}

	dsn := fmt.Sprintf("host=localhost port=%s user=%s password=%s dbname=%s sslmode=disable",
		found["DB_PORT"],
		found["DB_USER"],
		found["DB_PASSWORD"],
		found["DB_NAME"],
	)

	dbConnect, err := sql.Open("postgres", dsn)
	if err != nil {
		panic(err.Error())
	}

	return dbConnect
}

func (db DB) Trunc(tablename string) error {
	query := fmt.Sprintf("truncate table %s cascade", pq.QuoteIdentifier(tablename))
	_, err := db.Exec(query)
	return err
}
