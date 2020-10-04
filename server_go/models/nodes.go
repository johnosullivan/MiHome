package models

import (
  "fmt"
  "time"

  "github.com/satori/go.uuid"

	"github.com/johnosullivan/gomihome/db"
  "github.com/johnosullivan/gomihome/utilities"
)

func CreateNode(account string, node utilities.NodeRequest) (bool, string) {
    ndSqlStatement := `
      INSERT INTO nodes (id, account_id, node_name)
      VALUES ($1, $2, $3)
    `

    id := uuid.NewV4().String()

    _, err := database.GetDB().Exec(ndSqlStatement, id, account, node.Name)

    if err != nil {
      fmt.Println(err)
      return false, ""
    }

    return true, id
}

func GetNodes(account string) (bool, []utilities.NodeResponse) {
    rows, err := database.GetDB().Query("SELECT id, node_name, seen_last_at, node_status, created_at, updated_at FROM nodes WHERE account_id = $1", account)
    if err != nil {
      fmt.Println(err)
      return false, nil
    }
    defer rows.Close()

    nodes := []utilities.NodeResponse{}

    for rows.Next() {
      var id string
      var node_name string
      var seen_last_at string
      var node_status int
      var created_at string
      var updated_at string
      err = rows.Scan(&id, &node_name, &seen_last_at, &node_status, &created_at, &updated_at)
      if err == nil { 
        nodes = append(nodes, utilities.NodeResponse{
          NodeId: id, 
          NodeName: node_name, 
          NodeStatus: node_status, 
          SeenLastAt: seen_last_at, 
          CreatedAt: created_at, 
          UpdatedAt: updated_at,
        })
      }
      fmt.Println(err)
    }

    return true, nodes
}

func UpdateNodeStatus(account string, status int) bool {
    ndSqlStatement := `
      UPDATE nodes SET node_status = $1 WHERE id = $2
    `

    _, err := database.GetDB().Exec(ndSqlStatement, status, account)

    if err != nil {
      fmt.Println(err)
      return false 
    }

    return true 
}

func UpdateNodeLastSeen(account string, datetime time.Time) bool {
    ndSqlStatement := `
      UPDATE nodes SET seen_last_at = $1 WHERE id = $2
    `

    _, err := database.GetDB().Exec(ndSqlStatement, datetime, account)

    if err != nil {
      fmt.Println(err)
      return false 
    }

    return true 
}