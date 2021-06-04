package routes

import (
  "os"
  "net/http"

	"github.com/johnosullivan/gomihome/middlewares"
	"github.com/johnosullivan/gomihome/controllers"
  "github.com/johnosullivan/gomihome/websockets"
  "github.com/gorilla/handlers"
)

func GetRoutes() *http.ServeMux {
  router := http.NewServeMux()

  hub := websockets.NewHub()
  go hub.Run()
  //go hub.Ping()

  router.Handle("/ping", handlers.LoggingHandler(os.Stdout, http.HandlerFunc(controllers.PingLink)))

  router.Handle("/authenticate", handlers.LoggingHandler(os.Stdout, http.HandlerFunc(controllers.AuthenticateHandler)))

  router.Handle("/accounts", handlers.LoggingHandler(os.Stdout, http.HandlerFunc(controllers.AccountsHandler)))

  router.Handle("/nodes", handlers.LoggingHandler(os.Stdout, middlewares.AuthMiddleware(http.HandlerFunc(controllers.NodeHandler))))

  router.Handle("/authping", handlers.LoggingHandler(os.Stdout,  middlewares.AuthMiddleware(http.HandlerFunc(controllers.AuthPingHandler))))

  router.Handle("/qrcode", handlers.LoggingHandler(os.Stdout, http.HandlerFunc(controllers.AuthenticateQRCode)))

  router.HandleFunc("/ws_test", func(w http.ResponseWriter, r *http.Request) {
        http.ServeFile(w, r, "ws_test.html")
  })

	router.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		    websockets.ServeWebSocket(hub, w, r)
	})

  return router
}
