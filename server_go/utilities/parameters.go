package utilities

import (
  "io/ioutil"
  "strconv"
  "os"
)

const SECRET_VOLUME_PATH = "SECRET_VOLUME_PATH"
const ENV_TYPE = "ENV_TYPE"

var jwtSecret = ""
var dbConfig map[string]string

const (
    dbhost = "DBHOST"
    dbport = "DBPORT"
    dbuser = "DBUSER"
    dbpass = "DBPASS"
    dbname = "DBNAME"
)

func GetJWTSecret() string {
  return jwtSecret
}

func GetDBConfig() map[string]string {
  return dbConfig
}

func InitEnvironment() {
  envtype, err := strconv.ParseBool(os.Getenv(ENV_TYPE))
  CheckError(err)

  if envtype {
    secret, err := ioutil.ReadFile(os.Getenv(SECRET_VOLUME_PATH) + "/secret")
    CheckError(err)
  	jwtSecret = string(secret)
  } else {
  	jwtSecret = os.Getenv("JWT_SECRET")
  }

  dBConfig()
}

func dBConfig() {
    conf := make(map[string]string)
    host, ok := os.LookupEnv(dbhost)
    if !ok {
        panic("DBHOST environment variable required but not set")
    }
    port, ok := os.LookupEnv(dbport)
    if !ok {
        panic("DBPORT environment variable required but not set")
    }
    user, ok := os.LookupEnv(dbuser)
    if !ok {
        panic("DBUSER environment variable required but not set")
    }
    password, ok := os.LookupEnv(dbpass)
    if !ok {
        panic("DBPASS environment variable required but not set")
    }
    name, ok := os.LookupEnv(dbname)
    if !ok {
        panic("DBNAME environment variable required but not set")
    }
    conf[dbhost] = host
    conf[dbport] = port
    conf[dbuser] = user
    conf[dbpass] = password
    conf[dbname] = name
    dbConfig = conf
}
