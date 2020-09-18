package main

import (
	"net/http"
	"os"

	"context"
	"flag"
	"os/signal"
	"strconv"
	"time"

	log "github.com/sirupsen/logrus"

	"github.com/johnosullivan/gomihome/routes"
	"github.com/johnosullivan/gomihome/utilities"
	"github.com/johnosullivan/gomihome/db"

	"github.com/joho/godotenv"

	"crypto/rsa"
	"crypto/rand"
	"crypto/x509"
    "encoding/pem"
    "errors"
	//"fmt"
)

const LOGFILE_ENV_NAME = "LOGFILE"
const JSONOUTPUT_ENV_NAME = "JSONOUTPUT"
const LOG_PATH_ENV_NAME = "LOG_PATH"

type App struct {
	Router *http.ServeMux
}

func (app *App) Initialize() {
	utilities.InitEnvironment()

	app.Router = routes.GetRoutes()
}


func GenerateRsaKeyPair() (*rsa.PrivateKey, *rsa.PublicKey) {
    privkey, _ := rsa.GenerateKey(rand.Reader, 2048)
    return privkey, &privkey.PublicKey
}

func ExportRsaPrivateKeyAsPemStr(privkey *rsa.PrivateKey) string {
    privkey_bytes := x509.MarshalPKCS1PrivateKey(privkey)
    privkey_pem := pem.EncodeToMemory(
            &pem.Block{
                    Type:  "RSA PRIVATE KEY",
                    Bytes: privkey_bytes,
            },
    )
    return string(privkey_pem)
}

func ParseRsaPrivateKeyFromPemStr(privPEM string) (*rsa.PrivateKey, error) {
    block, _ := pem.Decode([]byte(privPEM))
    if block == nil {
            return nil, errors.New("failed to parse PEM block containing the key")
    }

    priv, err := x509.ParsePKCS1PrivateKey(block.Bytes)
    if err != nil {
            return nil, err
    }

    return priv, nil
}

func ExportRsaPublicKeyAsPemStr(pubkey *rsa.PublicKey) (string, error) {
    pubkey_bytes, err := x509.MarshalPKIXPublicKey(pubkey)
    if err != nil {
            return "", err
    }
    pubkey_pem := pem.EncodeToMemory(
            &pem.Block{
                    Type:  "RSA PUBLIC KEY",
                    Bytes: pubkey_bytes,
            },
    )

    return string(pubkey_pem), nil
}

func ParseRsaPublicKeyFromPemStr(pubPEM string) (*rsa.PublicKey, error) {
    block, _ := pem.Decode([]byte(pubPEM))
    if block == nil {
            return nil, errors.New("failed to parse PEM block containing the key")
    }

    pub, err := x509.ParsePKIXPublicKey(block.Bytes)
    if err != nil {
            return nil, err
    }

    switch pub := pub.(type) {
    case *rsa.PublicKey:
            return pub, nil
    default:
            break // fall through
    }
    return nil, errors.New("Key type is not RSA")
}

func main() {
	/*
	// Create the keys
    priv, pub := GenerateRsaKeyPair()

    // Export the keys to pem string
    priv_pem := ExportRsaPrivateKeyAsPemStr(priv)
    pub_pem, _ := ExportRsaPublicKeyAsPemStr(pub)

    // Import the keys from pem string
    priv_parsed, _ := ParseRsaPrivateKeyFromPemStr(priv_pem)
    pub_parsed, _ := ParseRsaPublicKeyFromPemStr(pub_pem)

    // Export the newly imported keys
    priv_parsed_pem := ExportRsaPrivateKeyAsPemStr(priv_parsed)
    pub_parsed_pem, _ := ExportRsaPublicKeyAsPemStr(pub_parsed)

    fmt.Println(priv_parsed_pem)
    fmt.Println(pub_parsed_pem)

    // Check that the exported/imported keys match the original keys
    if priv_pem != priv_parsed_pem || pub_pem != pub_parsed_pem {
            fmt.Println("Failure: Export and Import did not result in same Keys")
    } else {
            fmt.Println("Success")
    }
    */

	errenv := godotenv.Load()
  	if errenv != nil { }

	logfile, err := strconv.ParseBool(os.Getenv(LOGFILE_ENV_NAME))
	utilities.CheckError(err)

	if logfile {
		file, err := os.OpenFile(os.Getenv(LOG_PATH_ENV_NAME), os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()
		log.SetOutput(file)
	}

	inJSON, err := strconv.ParseBool(os.Getenv(JSONOUTPUT_ENV_NAME))
	utilities.CheckError(err)
	if inJSON {
		log.SetFormatter(&log.JSONFormatter{})
	}

	var wait time.Duration
	flag.DurationVar(&wait, "gto", time.Second * 15, "")
	flag.Parse()

	utilities.InitEnvironment()

	// TODO: Add DB Migrations
	database.InitDB() // Connection DB

	router := routes.GetRoutes()

	var port = os.Getenv("PORT")
	if len(port) == 0 {
		panic("env.PORT is required!")
	}

	srv := &http.Server{
		Addr:         ":" + port,
		WriteTimeout: time.Second * 15,
		ReadTimeout:  time.Second * 15,
		IdleTimeout:  time.Second * 60,
		Handler:      router,
	}

	go func() {
		if err := srv.ListenAndServe(); err != nil {
			log.Println(err)
		}
	}()

	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt)
	<-c

	ctx, cancel := context.WithTimeout(context.Background(), wait)
	defer cancel()
	srv.Shutdown(ctx)
	os.Exit(0)
}
