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
	Role_id      string `json:"role"`
	CreationDate time.Time
}

func NewUser(name string, email string, password string, role string) *User {
	hash := sha256.Sum256([]byte(password))
	// passwordHashed := hex.EncodeToString(hash[:]) //nop
	passwordHashed := base64.StdEncoding.EncodeToString(hash[:]) // le dev faiait un base 64 pour stocker le hash
	return &User{
		UserId:       uuid.New(),
		Username:     name,
		EmailAdress:  email,
		PhotoUrl:     "/uploads/invoicika.png", //var uploadsFolder = Path.Combine(_env.WebRootPath, "uploads"); //var uniqueFileName = Guid.NewGuid().ToString() + "_" + photo.FileName;
		PasswordHash: passwordHashed,
		Role_id:      roleToUUID(role),
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

//todo faut recuperer les roles et leurs uuids pour de vrai ici
// func (db DB) getRoleIds() []uuid.UUID {

// 	ids := []uuid.UUID{}

// 	rows, err := db.Query("select \"UserId\" from \"Users\"")
// 	if err != nil {
// 		panic(err)
// 	}
// 	defer rows.Close()

// 	for rows.Next() {
// 		var id uuid.UUID
// 		err := rows.Scan(&id)
// 		if err != nil {
// 			panic(err)
// 		}

// 		fmt.Printf("ID: %v\n", id)

// 		ids = append(ids, id)

// 		if rows.Err() != nil {
// 			panic(rows.Err())
// 		}
// 	}

// 	return ids
// }

// return role guuid or employee if not found
func roleToUUID(role string) string {
	// hardcoded from the intit db, theres not much to do with perm tbf
	roles := map[string]string{
		"employee": "3c128167-8201-43c1-a841-003c2258589e",
		"admin":    "a95e8d13-c513-4b8f-95f0-4266b87bbe6d",
	}
	if val, ok := roles[role]; ok {
		return val
	}
	return roles["employee"]
}
