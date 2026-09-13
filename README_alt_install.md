# Installation sans le CLI

## Avec PostGreSQL

## Installation
```ps
docker compose up -d --build
```
### Reset de la base de données
```ps
psql "postgresql://postgres:invoicika!123@localhost:5433/invoicikaDb" -f ./_tools/db_backups/Backup_invoicika_002.sql
```

## Sans PostGreSQL
## Installation
```ps
docker compose up -d --build
```
### Reset de la base de données
Sans postgreSQL
```ps
docker compose down -v ; docker compose up -d --build
```