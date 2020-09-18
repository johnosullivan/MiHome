package utilities

import (
  "github.com/gorilla/mux"
)


type App struct {
	Router *mux.Router
}

const WS_ENUM_OFFLINE = 0
const WS_ENUM_ONLINE = 1
