package controllers

import (
  //"io"
  "time"
  "fmt"
	"net/http"
  "encoding/json"
  "math/rand"
  "github.com/dgrijalva/jwt-go"
  "github.com/johnosullivan/gomihome/utilities"
  "github.com/johnosullivan/gomihome/models"

  "image/color"
  //qrcode "github.com/yeqown/go-qrcode"
  qrcode "github.com/skip2/go-qrcode"

  "strings"
)
/*
type smallerCircle struct {
	smallerPercent float64
}

func (sc *smallerCircle) DrawFinder(ctx *qrcode.DrawContext) {
	backup := sc.smallerPercent
	sc.smallerPercent = 1.0
	sc.Draw(ctx)
	sc.smallerPercent = backup
}

func newShape(radiusPercent float64) qrcode.IShape {
	return &smallerCircle{smallerPercent: radiusPercent}
}

func (sc *smallerCircle) Draw(ctx *qrcode.DrawContext) {
	w, h := ctx.Edge()
	upperLeft := ctx.UpperLeft()
	color := ctx.Color()

	// choose a proper radius values
	radius := w / 2
	r2 := h / 2
	if r2 <= radius {
		radius = r2
	}

	// 80 percent smaller
	radius = int(float64(radius) * sc.smallerPercent)

	cx, cy := upperLeft.X+w/2, upperLeft.Y+h/2 // get center point
	ctx.DrawCircle(float64(cx), float64(cy), float64(radius))
	ctx.SetColor(color)
	ctx.Fill()

}
*/

type AuthQRCodeStruct struct {
    DateTime  string `json:"datetime"`
	  Nonce     int    `json:"nonce"`
    Key       string `json:"key"`
}

type AuthQRCodeStructRequest struct {
    Id       string `json:"id"`
}

func AuthenticateQRCode(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
      case http.MethodPost: {
        var body AuthQRCodeStructRequest
        err := json.NewDecoder(r.Body).Decode(&body)
        if err != nil {
            w.WriteHeader(http.StatusBadRequest)
            return
        }

        rand.Seed(time.Now().Unix())
        charSet := "abcdedfghijklmnopqrstABCDEFGHIJKLMNOP"
        var output strings.Builder
        length := 20
        for i := 0; i < length; i++ {
            random := rand.Intn(len(charSet))
            randomChar := charSet[random]
            output.WriteString(string(randomChar))
        }

        t , _ := time.Now().UTC().MarshalText()
        payl := &AuthQRCodeStruct{DateTime: string(t), Nonce: rand.Intn(1000000), Key: output.String()/*, Id: body.Id*/}
        e, err := json.Marshal(payl)
        if err != nil {
            fmt.Println(err)
            return
        }

        q, err := qrcode.New(string(e), qrcode.Highest)
      	if err != nil {
      		return
      	}

      	q.DisableBorder = true
      	q.ForegroundColor = color.RGBA{R: 0x0, G: 0x7B, B: 0xAE, A: 0xff}
      	q.BackgroundColor = color.Black

      	err = q.Write(512, w)
      	if err != nil {
      		return
      	}

        return
      }
      default:
        w.WriteHeader(http.StatusMethodNotAllowed)
    }
}

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
            fmt.Println(acc)
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
