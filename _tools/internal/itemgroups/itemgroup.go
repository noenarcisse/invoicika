package itemgroups

import (
	"database/sql"
	"fmt"
	"math/rand/v2"

	"github.com/google/uuid"
)

type DB struct {
	*sql.DB
}

func NewDB(conn *sql.DB) *DB {
	return &DB{conn}
}

type ItemGroup struct {
	ItemGroupId uuid.UUID
	Title       string `json:"title"`
	Descr       string `json:"description"`
	UserId      uuid.UUID
}

func NewItemGroup(title string, descr string) *ItemGroup {

	return &ItemGroup{
		ItemGroupId: uuid.New(),
		Title:       title,
		Descr:       descr,
	}
}

func (db DB) getUserIds() []uuid.UUID {

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

		fmt.Printf("ID: %v\n", id)

		ids = append(ids, id)

		if rows.Err() != nil {
			panic(rows.Err())
		}
	}

	return ids
}

func (db DB) Inject(groups []ItemGroup) {

	userIds := db.getUserIds()
	fmt.Println(userIds)

	randomUser := rand.IntN(len(userIds))

	for _, g := range groups {
		_, err := db.Exec("insert into \"ItemGroups\"(\"ItemGroupId\", \"Title\", \"Description\", \"User_id\") values($1,$2,$3,$4)",
			g.ItemGroupId,
			g.Title,
			g.Descr,
			userIds[randomUser],
		)
		if err != nil {
			panic(err)
		}
	}

}
