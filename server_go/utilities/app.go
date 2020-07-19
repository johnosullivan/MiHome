package utilities

import (
  "github.com/gorilla/mux"
)


type App struct {
	Router *mux.Router
}

/*func (a *App) Initialize() {
	utilities.InitEnvironment()

	a.Router = routes.GetRoutes()
}*/
