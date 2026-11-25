package items

import (
	"database/sql"
	"dbinjector/internal/database"
	"fmt"
	"math/rand/v2"
	"time"

	"github.com/google/uuid"
)

type DB struct {
	*sql.DB
}

func NewDB(conn *sql.DB) *DB {
	return &DB{conn}
}

type Item struct {
	ItemId        uuid.UUID
	Name          string `json:"name"`
	Descr         string `json:"description"`
	PurchasePrice int    `json:"purchasePriceCents"` //in cents
	SalePrice     int    `json:"salePriceCents"`     //in cents
	Quantity      int
	CreationDate  time.Time
}

func NewItem(name string, descr string, purchase int, sale int) *Item {

	return &Item{
		ItemId:        uuid.New(),
		Name:          name,
		Descr:         descr,
		PurchasePrice: purchase,
		SalePrice:     sale,
		Quantity:      rand.IntN(100),
		CreationDate:  time.Now().UTC(),
	}
}

func (db DB) InjectItems(is []Item) {

	userIds := database.NewDB(db.DB).GetUserIds()
	fmt.Println(userIds)

	for _, i := range is {
		randomUser := rand.IntN(len(userIds))
		_, err := db.Exec("insert into \"Items\"(\"ItemId\", \"Name\", \"Description\", \"PurchasePrice\", \"SalePrice\", \"Quantity\", \"User_id\", \"CreationDate\") values($1,$2,$3, CAST(ROUND($4 / 100, 0) AS BIGINT),CAST(ROUND($5 / 100, 0) AS BIGINT),$6,$7,$8)",
			i.ItemId,
			i.Name,
			i.Descr,
			i.PurchasePrice,
			i.SalePrice,
			i.Quantity,
			userIds[randomUser],
			i.CreationDate,
		)
		if err != nil {
			panic(err)
		}
	}

}
