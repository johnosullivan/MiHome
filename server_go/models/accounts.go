package models

import (
  "log"
  "fmt"

  "golang.org/x/crypto/bcrypt"
  "github.com/satori/go.uuid"

	"github.com/johnosullivan/gomihome/db"
  "github.com/johnosullivan/gomihome/utilities"
)

func AccountExists(email string) bool {
    var count int
    row := database.GetDB().QueryRow("SELECT COUNT(*) FROM accounts WHERE email = $1", &email)

  	err := row.Scan(&count)
  	if err != nil {
  		log.Fatal(err)
  	}

    return count != 0
}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}

func CreateAccount(account utilities.AccountRequest) bool {
    fmt.Println(account)

    hash, err := bcrypt.GenerateFromPassword([]byte(account.Password), bcrypt.DefaultCost)
    if err != nil {
        fmt.Println(err)
        return false
    } else {
        acSqlStatement := `
          INSERT INTO accounts (id, first_name, last_name, email, password)
          VALUES ($1, $2, $3, $4, $5)
          `
        _, err = database.GetDB().Exec(acSqlStatement,
          uuid.NewV4().String(),
          account.Firstname,
          account.Lastname,
          account.Email,
          string(hash))
        if err != nil {
          fmt.Println(err)
          return false
        }
        return true
    }
}

func GetAccountByEmail(email string) utilities.Account {
  var acc utilities.Account

  rows, err := database.GetDB().Query("SELECT id, email, password FROM accounts WHERE email = $1", email)
  if err != nil {
    panic(err)
  }
  defer rows.Close()

  for rows.Next() {
    var id string
    var email string
    var password string

    err = rows.Scan(&id, &email, &password)
    if err != nil {
      panic(err)
    }

    acc = utilities.Account{Email: email, Password: password, Id: id}
  }

  return acc
}
