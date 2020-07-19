package controllers

import (
  "io"
  "time"
  "fmt"
	"net/http"
  "github.com/dgrijalva/jwt-go"
  "github.com/johnosullivan/gomihome/utilities"

  //"golang.org/x/crypto/bcrypt"
)

func AuthenticateHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Add("Content-Type", "application/json")
    r.ParseForm()

    var APP_KEY = utilities.GetJWTSecret()

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "user": "admin",
        "exp":  time.Now().Add(time.Hour * time.Duration(1)).Unix(),
        "iat":  time.Now().Unix(),
    })

    tokenString, err := token.SignedString([]byte(APP_KEY))
    if err != nil {
        w.WriteHeader(http.StatusInternalServerError)
        io.WriteString(w, `{"error":"token_generation_failed"}`)
        return
    }

    io.WriteString(w, `{"token":"`+tokenString+`"}`)
    return
}

func UsersHandler(w http.ResponseWriter, r *http.Request) {
    fmt.Println(r.Method)
    switch r.Method {
      case http.MethodPost:
          w.Header().Add("Content-Type", "application/json")
          io.WriteString(w, `{"status":"ok"}`)
      case http.MethodPut:

      default:
          w.WriteHeader(http.StatusMethodNotAllowed)
    }
}
