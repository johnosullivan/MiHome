package middlewares

import (
	"net/http"
  "log"

	"github.com/auth0/go-jwt-middleware"
  "github.com/dgrijalva/jwt-go"

  "github.com/johnosullivan/gomihome/utilities"
)

func AuthMiddleware(next http.Handler) http.Handler {
    var APP_KEY = utilities.GetJWTSecret()
    if len(APP_KEY) == 0 {
        log.Fatal("HTTP server unable to start, expected an APP_KEY for JWT auth")
    }
    jwtMiddleware := jwtmiddleware.New(jwtmiddleware.Options{
        ValidationKeyGetter: func(token *jwt.Token) (interface{}, error) {
            return []byte(APP_KEY), nil
        },
        SigningMethod: jwt.SigningMethodHS256,
    })
    return jwtMiddleware.Handler(next)
}
