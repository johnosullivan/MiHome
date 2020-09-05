package controllers

import (
  "io"
	"net/http"
  "time"
  "encoding/json"

  //"fmt"
  "github.com/johnosullivan/gomihome/websockets"
  //"github.com/johnosullivan/go-fun/db"
)

type SystemStatus struct {
  Date    time.Time `json:"date"`
  Status  bool      `json:"status"`
}

func PingLink(w http.ResponseWriter, r *http.Request) {
    switch r.Method {
      case http.MethodGet: {
          sysStatus := SystemStatus{time.Now(), true}
          js, err := json.Marshal(sysStatus)
          if err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
          }

          command := r.URL.Query().Get("data")


          data := "{\"type\": \"" + command+ "\",\"payload\": {}}"

          hub := websockets.GetHub()
          hub.Broadcast <- []byte(data)

          w.Header().Set("Content-Type", "application/json")
          w.Write(js)
      }
      default:
          w.WriteHeader(http.StatusMethodNotAllowed)
    }
}

func AuthPingHandler(w http.ResponseWriter, r *http.Request) {
    w.Header().Add("Content-Type", "application/json")
    io.WriteString(w, `{"status":"ok"}`)
}
