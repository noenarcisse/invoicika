package database

import (
	"database/sql"
	"dbinjector/internal/yamlparser"
	"fmt"

	"github.com/lib/pq"
)

type DB struct {
	*sql.DB
}

func NewDB(connection *sql.DB) *DB {
	return &DB{connection}
}

func OpenDB(dblogs *yamlparser.PsqlLogs) *sql.DB {

	dsn := fmt.Sprintf("host=localhost port=%s user=%s password=%s dbname=%s sslmode=disable",
		dblogs.Port,
		dblogs.User,
		dblogs.Password,
		dblogs.Db,
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
