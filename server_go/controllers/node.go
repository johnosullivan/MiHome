package controllers

import (
	"fmt"
	"net/http"
	"encoding/json"

	"github.com/johnosullivan/gomihome/utilities"
	"github.com/johnosullivan/gomihome/models"

	"github.com/dgrijalva/jwt-go"
)

func NodeHandler(w http.ResponseWriter, r *http.Request) {
	// Gets user from the request context
    user := r.Context().Value("user")

    // Get account id from jwt claims
    accountStruct := user.(*jwt.Token).Claims.(jwt.MapClaims)["account"]
    accountId := fmt.Sprintf("%s", accountStruct)

    switch r.Method {
      case http.MethodPost: {
        // Get the node request type (body params)
        var node utilities.NodeRequest
        w.Header().Add("Content-Type", "application/json")

        // Decode the request json body
        err := json.NewDecoder(r.Body).Decode(&node)
        if err != nil {
            w.WriteHeader(http.StatusBadRequest)
            return
        }

        status, node_id := models.CreateNode(accountId, node)
        if (status) {
            response := utilities.NodeResponse{NodeId: node_id}
	        respData, err := json.Marshal(response)

	        if err != nil {
		        http.Error(w, err.Error(), http.StatusInternalServerError)
		        return
	        }

	        w.WriteHeader(http.StatusCreated)
	        w.Write(respData)
            return
        } else {
            w.WriteHeader(http.StatusBadRequest)
            return
        }
      }
      case http.MethodGet: {
      	status, nodes := models.GetNodes(accountId)
      	w.Header().Add("Content-Type", "application/json")

        if (status) {
	      	response := utilities.NodesResponse{Nodes: nodes}
	        respData, err := json.Marshal(response)
	        if err != nil {
	          http.Error(w, err.Error(), http.StatusInternalServerError)
	          return
	        }

	        w.WriteHeader(http.StatusOK)
	        w.Write(respData)
            return
        } else {
            w.WriteHeader(http.StatusBadRequest)
            return
        }
      }
      default:
        w.WriteHeader(http.StatusMethodNotAllowed)
    }
}