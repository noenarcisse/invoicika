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
Franchement ? Sans regret ?

## Installation
```ps
docker compose up -d --build
```
### Reset de la base de données
Sans postgreSQL
```ps
docker compose down -v ; docker compose up -d --build
```
ou
```ps
docker compose cp .\db_backups\Backup_invoicika_002.sql squash-tm-pg:/tmp/backup.sql
docker compose cp .\truncdb.sql squash-tm-pg:/tmp/truncdb.sql
docker compose exec squash-tm-pg psql -U postgres -d squashtm_invoicika -f /tmp/truncdb.sql
docker compose exec squash-tm-pg psql -U postgres -d squashtm_invoicika -f /tmp/backup.sql
docker compose exec squash-tm-pg rm /tmp/backup.sql
docker compose exec squash-tm-pg rm /tmp/truncdb.sql
```