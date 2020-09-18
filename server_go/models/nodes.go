package models

import (
  //"log"
  "fmt"

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