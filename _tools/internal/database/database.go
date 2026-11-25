package database

import (
	"database/sql"
	"dbinjector/internal/yamlparser"
	"fmt"
	"uuid"

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

func (db DB) GetUserIds() []uuid.UUID {

	ids := []uuid.UUID{}

	rows, err := db.Query("select \"UserId\" from \"Users\"")
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
		ids = append(ids, id)
	}

	if rows.Err() != nil {
		panic(rows.Err())
	}

	return ids
}
