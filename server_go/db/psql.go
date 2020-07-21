package database

import (
  "database/sql"
  "strconv"
	"fmt"
  "os"

	_ "github.com/lib/pq"

  "github.com/johnosullivan/gomihome/utilities"
  "golang.org/x/crypto/bcrypt"
  "github.com/aws/aws-sdk-go/service/secretsmanager"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
  "encoding/json"
  "time"
)

const (
    dbhost = "DBHOST"
    dbport = "DBPORT"
    dbuser = "DBUSER"
    dbpass = "DBPASS"
    dbname = "DBNAME"

    awsenabled = "AWS_SM_ENABLED"
    awsname = "AWS_SM_NAME"
    awsregion = "AWS_SM_REGION"
    awsdbname = "AWS_SM_DBNAME"
    awsdbhost = "host"
    awsdbport = "port"
    awsdbuser = "username"
    awsdbpass = "password"
)

const dbtimeout = 60000

var db *sql.DB

var isMonitoring = false

func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}

func PingDB() {
  var err error
  err = db.Ping()
  if err != nil {
      panic(err)
  }
}

func GetDB() *sql.DB {
  return db
}

func InitDB() {
    var psqlInfo string

    awssm, awserr := strconv.ParseBool(os.Getenv(awsenabled))
    utilities.CheckError(awserr)

    if awssm {
      config := getSecretsManagerValues()
      psqlInfo = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
          config[awsdbhost], fmt.Sprint(config[awsdbport]), config[awsdbuser], config[awsdbpass], os.Getenv(dbname))
    } else {
      config := utilities.GetDBConfig()
      psqlInfo = fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
          config[dbhost], config[dbport], config[dbuser], config[dbpass], config[dbname])
    }

    var err error
    db, err = sql.Open("postgres", psqlInfo)
    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(25)
    db.SetConnMaxLifetime(5 * time.Minute)
    if err != nil {
        if !isMonitoring {
          panic(err)
        }
    }

    if !isMonitoring {
      go monitorConnection(db)
      isMonitoring = true
    }
}

func monitorConnection(sql *sql.DB) {
    var err error

    for {
        err = sql.Ping()
        if err != nil {
          fmt.Println(err)
          InitDB()
        }
        time.Sleep(time.Duration(dbtimeout) * time.Millisecond)
    }
}

func getSecretsManagerValues() map[string]interface{} {
	secretName := os.Getenv(awsname)
	region := os.Getenv(awsregion)

	svc := secretsmanager.New(session.New(), aws.NewConfig().WithRegion(region))

	input := &secretsmanager.GetSecretValueInput{
		SecretId:     aws.String(secretName),
		VersionStage: aws.String("AWSCURRENT"),
	}

	result, err := svc.GetSecretValue(input)
	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
				case secretsmanager.ErrCodeDecryptionFailure:
				      fmt.Println(secretsmanager.ErrCodeDecryptionFailure, aerr.Error())
				case secretsmanager.ErrCodeInternalServiceError:
				      fmt.Println(secretsmanager.ErrCodeInternalServiceError, aerr.Error())
				case secretsmanager.ErrCodeInvalidParameterException:
				      fmt.Println(secretsmanager.ErrCodeInvalidParameterException, aerr.Error())
				case secretsmanager.ErrCodeInvalidRequestException:
				      fmt.Println(secretsmanager.ErrCodeInvalidRequestException, aerr.Error())
				case secretsmanager.ErrCodeResourceNotFoundException:
				      fmt.Println(secretsmanager.ErrCodeResourceNotFoundException, aerr.Error())
			}
		} else {
			fmt.Println(err.Error())
		}
	}

	var secretString string
	if result.SecretString != nil {
		secretString = *result.SecretString
	}

  creds := make(map[string]interface{})

  jsonerr := json.Unmarshal([]byte(secretString), &creds)
  utilities.CheckError(jsonerr)

  return creds
}
