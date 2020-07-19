package main

import (
    "os"
    "testing"
    "net/http"
	  "net/http/httptest"
    "encoding/json"
)

var a App
var jwtToken = ""

func TestMain(m *testing.M) {
	a = App{}
	a.Initialize()

	code := m.Run()

	os.Exit(code)
}

func executeRequest(req *http.Request, app App) *httptest.ResponseRecorder {
	rr := httptest.NewRecorder()
	app.Router.ServeHTTP(rr, req)
	return rr
}

func checkResponseCode(t *testing.T, expected, actual int) {
	if expected != actual {
		t.Errorf("Expected response code %d. Got %d\n", expected, actual)
	}
}

func TestPingLink(t *testing.T) {
    req, _ := http.NewRequest("GET", "/ping", nil)
    response := executeRequest(req, a)
    checkResponseCode(t, http.StatusOK, response.Code)
}

func TestAuthenticateHandler(t *testing.T) {
    req, _ := http.NewRequest("POST", "/authenticate", nil)
    response := executeRequest(req, a)
    data := make(map[string]interface{})
    err := json.Unmarshal(response.Body.Bytes(), &data)
    if err == nil {
      jwtToken = data["token"].(string)
    }
    checkResponseCode(t, http.StatusOK, response.Code)
}

func TestAuthPingHandlerSuccess(t *testing.T) {
    var bearer = "Bearer " + jwtToken
    req, _ := http.NewRequest("GET", "/authping", nil)
    req.Header.Add("Authorization", bearer)
    response := executeRequest(req, a)
    checkResponseCode(t, http.StatusOK, response.Code)
}

func TestAuthPingHandlerFailure(t *testing.T) {
    req, _ := http.NewRequest("GET", "/authping", nil)
    response := executeRequest(req, a)
    checkResponseCode(t, http.StatusUnauthorized, response.Code)
}
