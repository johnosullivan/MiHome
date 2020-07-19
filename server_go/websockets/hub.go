package websockets

import (
  //"fmt"
	"time"
)

/*
E (550413) TRANS_TCP: tcp_poll_read select error 104, errno = Connection reset by peer, fd = 54
E (550413) WEBSOCKET_CLIENT: Network error: esp_transport_poll_read() returned -1, errno=119
*/

var sharedHub = &Hub{}

type Hub struct {
	clients map[*Client]bool
	Broadcast chan []byte
	register chan *Client
	unregister chan *Client
}

func NewHub() *Hub {
	sharedHub = &Hub{
		Broadcast:  make(chan []byte),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		clients:    make(map[*Client]bool),
	}
  return sharedHub
}

func GetHub() *Hub {
  return sharedHub
}

func Add(message []byte) {
  sharedHub.Broadcast <- message
}

func (h *Hub) Ping() {
	for {
		for client := range h.clients {
			client.send <- []byte("ping")
			time.Sleep(30 * time.Second)
		}
	}
}

func (h *Hub) Run() {
	for {
		select {
  		case client := <-h.register:
  			h.clients[client] = true
  		case client := <-h.unregister:
  			if _, ok := h.clients[client]; ok {
  				delete(h.clients, client)
  				close(client.send)
  			}
  		case message := <-h.Broadcast:
  			for client := range h.clients {
  				select {
    				case client.send <- message:
    				default:
    					close(client.send)
    					delete(h.clients, client)
    			}
  			}
  	}
	}
}
