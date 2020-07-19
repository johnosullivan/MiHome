# go-fun

docker run --name=gofun-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=postgres \
  -p 5432:5432 postgres:latest

```bash
export PORT=3000
export LOGFILE=0
export DBHOST=localhost
export DBPORT=5432
export DBUSER=postgres
export DBPASS=postgres
export DBNAME=postgres
export JWT_SECRET=MYRANDOMSECRET
export ENV_TYPE=0
export AWS_SM_ENABLED=0
```
