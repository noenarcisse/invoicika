package users

import (
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"fmt"
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
	RoleName     string `json:"role"`
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
		RoleName:     role,
		CreationDate: time.Now().UTC(),
	}
}

func (db *DB) InjectUsers(us []User) {

	// todo avec ce type d'err qui peut interrompre mid ecriture
	// faudrait faire un begin et commit si pas d'err
	// sinon rollback pour pas laisser la DB dans un etat entre 2
	roles, err := db.getRoleIds()
	if err != nil {
		panic(err)
	}

	fmt.Println(roles)

	for _, u := range us {

		if _, ok := roles[u.RoleName]; !ok {
			panic("Role not found")
		}

		_, err := db.Exec("insert into \"Users\"(\"UserId\", \"Username\", \"EmailAddress\", \"PhotoUrl\", \"PasswordHash\", \"Role_id\", \"CreationDate\") values($1,$2,$3,$4,$5,$6,$7)",
			u.UserId,
			u.Username,
			u.EmailAdress,
			u.PhotoUrl,
			u.PasswordHash,
			roles[u.RoleName],
			u.CreationDate,
		)
		if err != nil {
			panic(err)
		}
	}
}

// todo faut recuperer les roles et leurs uuids pour de vrai ici
func (db DB) getRoleIds() (roles map[string]uuid.UUID, err error) {
	roles = make(map[string]uuid.UUID)
	rows, err := db.Query("select \"RoleId\", \"RoleName\" from \"Roles\"")
	if err != nil {
		return
	}
	defer rows.Close()

	for rows.Next() {
		var roleName string
		var id uuid.UUID
		err = rows.Scan(&id, &roleName)
		if err != nil {
			return
		}

		fmt.Printf("ID: %v\n", id)

		roles[roleName] = id

		if rows.Err() != nil {
			err = rows.Err()
			return
		}
	}
	return
}
