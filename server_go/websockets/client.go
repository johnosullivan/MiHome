package websockets

import (
	"bytes"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/websocket"
  	"fmt"
)

const (
	writeWait = 10 * time.Second
	pongWait = 60 * time.Second
	pingPeriod = (pongWait * 9) / 10
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
		c.hub.unregister <- c
		c.conn.Close()
	}()
	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error { c.conn.SetReadDeadline(time.Now().Add(pongWait)); return nil })
	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}		
		message = bytes.TrimSpace(bytes.Replace(message, newline, space, -1))

		if string(message) == "auth" {
			c.client_id = "1bdc22f5-372e-4005-87b7-a023c46115b0"
			c.hub.idtoclients[c.client_id] = c
		} else {
			c.hub.Broadcast <- message
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
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
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
