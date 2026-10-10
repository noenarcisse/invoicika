# Invoicika - Testing

## Installation

Installer Docker<br>
https://www.docker.com/products/docker-desktop/

<!-- todo : plus nécéssaire pour l'installer, j'ai redirigé par docker et le psql intenre :D -->
<!-- Il sert encore pour le statedb.exe par contre -->
<!-- Installer PostGreSQL<br>
https://www.postgresql.org/download/ 

Ajouter psql au PATH de la machine
(C:\Program Files\PostgreSQL\18\bin) -->

```ps
git clone https://github.com/noenarcisse/invoicika.git ; cd invoicika
```

Télécharger le cli.exe et le placer dans le repository<br>
https://github.com/noenarcisse/invoicika/releases <br>

### Avec le CLI (recommandé)
Requiert Docker installé

Depuis la racine du projet invoicika :
```ps
./cli.exe -install
```
En cas de reset de la base de données : 
```ps
./cli.exe -reset
```
### Sans le CLI
voir : https://github.com/noenarcisse/invoicika/blob/main/README_alt_install.md

## Documentation
| couche / ressource | url |
|---|---|
| frontend | http://localhost:4444 |
| backend | http://localhost:5000 |
| swagger | http://localhost:5000/swagger |
| database | http://localhost:5433 |
| jira | https://onepushman.atlassian.net/jira |
| squash | http://localhost:8090/squash |

| username | password | role
|---|---|---|
| admin | admin | Admin
| Jacques Houille | cestokay | Employee
| Godefroy De Montmirail | quetrepassesijefaiblis | Employee

<!-- todo : old, en cas de hard reset (reset2) -->
<!-- | username | password |
|---|---|
| admin1 | admin1 |
| admin2 | admin2 |
| employee1 | employee1 |
| employee2 | employee2 | -->

## Présentation de l'application
https://github.com/noenarcisse/invoicika/blob/main/TESTS_TestingCampaign/00_Presentation/Application.md

## Modifications apportées au projet initial
https://github.com/noenarcisse/invoicika/blob/main/TESTS_TestingCampaign/00_Presentation/Modifications.md

## **Testing Stack**
https://github.com/noenarcisse/invoicika/blob/main/TESTS_TestingCampaign/00_Presentation/TestingStack.md