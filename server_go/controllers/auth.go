package controllers

import (
  //"io"
  "time"
  //"fmt"
	"net/http"
  "encoding/json"
  "github.com/dgrijalva/jwt-go"
  "github.com/johnosullivan/gomihome/utilities"
  "github.com/johnosullivan/gomihome/models"
)

func AuthenticateHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Add("Content-Type", "application/json")

    var req utilities.LoginRequest
    var JWT_SECRET = utilities.GetJWTSecret()

    // Decode the request json body
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        w.WriteHeader(http.StatusBadRequest)
        return
    }

    //  Try to find the an account by email
    acc := models.GetAccountByEmail(req.Email)

    if (models.CheckPasswordHash(req.Password, acc.Password)) {
        // Create a JWT clains
        token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
            "account": acc.Id,
            "exp":  time.Now().Add(time.Hour * time.Duration(24)).Unix(),
            "iat":  time.Now().Unix(),
        })
        tokenString, errtoken := token.SignedString([]byte(JWT_SECRET))
        if errtoken != nil {
            w.WriteHeader(http.StatusInternalServerError)
            return
        }

        
        response := utilities.AuthResponse{Token: tokenString}
        respData, err := json.Marshal(response)
        if err != nil {
          http.Error(w, err.Error(), http.StatusInternalServerError)
          return
        }

        w.WriteHeader(http.StatusOK)
        w.Write(respData)
        return
    } else {
        w.WriteHeader(http.StatusUnauthorized)
        return
    }

    return
}

func AccountsHandler(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
      case http.MethodPost: {
        // Get the account request type (body params)
        var acc utilities.AccountRequest
        w.Header().Add("Content-Type", "application/json")

        // Decode the request json body
        err := json.NewDecoder(r.Body).Decode(&acc)
        if err != nil {
            w.WriteHeader(http.StatusBadRequest)
            return
        }

        // Check the account exists in the system
        if (models.AccountExists(acc.Email)) {
            w.WriteHeader(http.StatusBadRequest)
            return
        } else {
            // Attempts to create the account
            if (models.CreateAccount(acc)) {
              w.WriteHeader(http.StatusCreated)
              return
            } else {
              w.WriteHeader(http.StatusBadRequest)
              return
            }
        }
      }
      case http.MethodPut: {
          w.WriteHeader(http.StatusMethodNotAllowed)
      }
      default:
          w.WriteHeader(http.StatusMethodNotAllowed)
    }
}
