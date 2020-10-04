package websockets

import (
	"fmt"
	"bytes"
	"log"
	"net/http"
	"time"
	"encoding/json"
	//"strings"

	"github.com/gorilla/websocket"

	"github.com/johnosullivan/gomihome/models"
	"github.com/johnosullivan/gomihome/utilities"
	//"github.com/johnosullivan/gomihome/services"
)

const (
	writeWait = 10 * time.Second
	pongWait = 36 * time.Second // 60 * time.Second
	pingPeriod = 30 * time.Second // (pongWait * 9) / 10
	maxMessageSize = 512
)

var (
	newline = []byte{'\n'}
	space   = []byte{' '}
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

type Client struct {
	hub *Hub
	conn *websocket.Conn
	send chan []byte
	client_id string
}

func (c *Client) readPump() {
	defer func() {
		models.UpdateNodeStatus(c.client_id, utilities.WS_ENUM_OFFLINE)
		c.hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { 
		c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil 
	})
	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}		
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))

		// {"type": "AUTH", "node_id": "c6d86d05-4151-4426-8c5e-ed43615f38fd"}
		//fmt.Println(string(message))

		var data map[string]interface{}
		if err := json.Unmarshal(message, &data); err == nil {
        	type_name := data["type"].(string)
        	if type_name == "AUTH" {
        		c.client_id = data["node_id"].(string)
				c.hub.idtoclients[c.client_id] = c
        		models.UpdateNodeStatus(c.client_id, utilities.WS_ENUM_ONLINE)
				models.UpdateNodeLastSeen(c.client_id, time.Now())
        	}
    	}
	}
}

func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				// The hub closed the channel.
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// Add queued chat messages to the current websocket message.
			n := len(c.send)
			for i := 0; i < n; i++ {
				w.Write(newline)
				w.Write(<-c.send)
			}

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			fmt.Println("sending heartbeat...")
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				// if fails must be offline
				fmt.Println(err)
				return
			} else {
				// headbeat db update last seen datetime stamps
				models.UpdateNodeLastSeen(c.client_id, time.Now())
			}
		}
	}
}

func ServeWebSocket(hub *Hub, w http.ResponseWriter, r *http.Request) {
  	upgrader.CheckOrigin = func(r *http.Request) bool { 
  		return true 
  	}

	conn, err := upgrader.Upgrade(w, r, nil)
  	if err != nil {
        fmt.Println(err)
        return
    }

  	client := &Client{hub: hub, conn: conn, send: make(chan []byte, 256), client_id: ""}
  	client.hub.register <- client

  	// Allow collection of memory referenced by the caller by doing all work in
  	// new goroutines.
  	go client.writePump()
  	go client.readPump()
}
