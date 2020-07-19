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
	// "github.com/johnosullivan/gomihome/db"

	"github.com/joho/godotenv"
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

func main() {
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

	// database.InitDB()

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
