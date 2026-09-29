package users

import (
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"time"

	"github.com/google/uuid"
)

type DB struct {
	*sql.DB
}

func NewDB(connection *sql.DB) *DB {
	return &DB{connection}
}

type User struct {
	UserId       uuid.UUID
	Username     string `json:"name"`
	EmailAdress  string `json:"email"`
	PhotoUrl     string
	PasswordHash string `json:"password"` //tag used for raw DTO from the json
	Role_id      string
	CreationDate time.Time
}

func NewUser(name string, email string, photourl string, password string) *User {
	hash := sha256.Sum256([]byte(password))
	// passwordHashed := hex.EncodeToString(hash[:]) //nop
	passwordHashed := base64.StdEncoding.EncodeToString(hash[:]) // le dev faiait un base 64 pour stocker le hash
	return &User{
		UserId:       uuid.New(),
		Username:     name,
		EmailAdress:  email,
		PhotoUrl:     photourl, //var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads"); //var uniqueFileName = Guid.NewGuid().ToString() + "_" + photo.FileName;
		PasswordHash: passwordHashed,
		Role_id:      "3c128167-8201-43c1-a841-003c2258589e", //employee hardcoded
		CreationDate: time.Now().UTC(),
	}
}

func (db *DB) InjectUsers(us []User) {
	for _, u := range us {
		_, err := db.Exec("insert into \"Users\"(\"UserId\", \"Username\", \"EmailAddress\", \"PhotoUrl\", \"PasswordHash\", \"Role_id\", \"CreationDate\") values($1,$2,$3,$4,$5,$6,$7)",
			u.UserId,
			u.Username,
			u.EmailAdress,
			u.PhotoUrl,
			u.PasswordHash,
			u.Role_id,
			u.CreationDate,
		)
		if err != nil {
			panic(err)
		}
	}
}
