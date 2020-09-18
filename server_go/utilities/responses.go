package utilities

type Response struct {
     Key  string  `json:"key"`
		 Secret string `json:"secret"`
}

type AuthResponse struct {
     Token  string  `json:"token"`
}

type AccountRequest struct {
    Email string
    Password string
    Firstname string
    Lastname string
    Location string
    Zip string
}

type LoginRequest struct {
    Email string
    Password string
}

type Account struct {
    Id string
    Email string
    Password string
}

type NodeRequest struct {
    Name string
}

type NodeResponse struct {
    NodeId  string          `json:"node_id"`
    NodeName string         `json:"node_name"`
    SeenLastAt string       `json:"seen_last_at"`
    NodeStatus int          `json:"node_status"`
    CreatedAt string        `json:"created_at"`
    UpdatedAt string        `json:"updated_at"`
}

type NodesResponse struct {
    Nodes  []NodeResponse   `json:"nodes"`
}