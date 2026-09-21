# Invoicika - Testing

## Installation

Installer Docker<br>
https://www.docker.com/products/docker-desktop/

Installer PostGreSQL<br>
https://www.postgresql.org/download/ 

Add psql to your PATH
(C:\Program Files\PostgreSQL\18\bin)
<!-- postGres rate parfois son path dans windows -_- -->

```ps
git clone https://github.com/noenarcisse/invoicika.git ; cd invoicika
```

Télécharger le cli.exe et le placer dans le repository<br>
https://github.com/noenarcisse/invoicika/releases <br>

### Avec le CLI (recommandé)
Requiert postgreSQL et Docker installé

Depuis la racine du projet invoicika :
```ps
./cli.exe -install
./cli.exe -state 1
```
En cas de reset de la base de données : 
```ps
./cli.exe -state 1
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

| username | password |
|---|---|
| admin1 | admin1 |
| admin2 | admin2 |
| employee1 | employee1 |
| employee2 | employee2 |

## Modifications apportées au projet initial
- Renommage du readme.md précédent pour l'archiver et créer ce readme.md orienté testing
- Changement de port pour la DB sur 5433 pour eviter les conflits avec un eventuel postgres natif sur la machine hote
- Mise a jour le docker-compose.yml pour eviter les migration a la main de MS SQL -> PostGres
- Ajout d'un injecteur de DB pour remplacer les noms des Customers entrés par le dev qui sont des acteurs de films un peu trop romantiques.
- Modification de la structure du folder avec un /Backend, ajout d'une solution globale en slnx et ajout du projet WebAPI.Tests
- Mise a jour du docker compose pour suivre la structure du dossier Backend
- Passage en commentaire de la création de volume pour le WebAPI
- Mise a jour du Nuget MailKit 10 -> 16 (vulne)
- Mise a jour de nombreux package JS sans --force (vulne)
- Override de nombreux package JS sans --fore (vulne). Liste trouvable dans le package.json

# Specs de l'application
Architecture frontend, backend et base de données détachés, le tout est containerisé en une composition avec Docker.
Backend ASP.NET en MVC.

# Tech Stack de l'application

| couche | nom |
|---|---|
| infra | Git & Github |
| infra | Docker |  
| frontend | NodeJS |   
| frontend | Typescript |   
| frontend | Angular 16 |  
| frontend | NG-Zorro |  
| backend | C# | 
| backend | .NET 10 | 
| backend | ASP.NET Core |
| backend | EF Core |
| backend | QuestPDF |
| backend | MailKit |
| infra/db | PostGreSQL |


# **Testing Stack**

<!-- Manque le CI CD -->
<!-- Git Github ? Git actions ? -->

| couche | nom | utilisation | url
|---|---|---|---|
| frontend | Jasmine & Karma | testing | https://angular.dev/guide/testing/karma |
| frontend | Testing Library Angular | testing | https://testing-library.com/docs/angular-testing-library/intro |
| frontend | Playwright? |  |  |
| backend |.NET 10.0 / C# | testing | https://dotnet.microsoft.com/fr-fr/ |
| backend/api | Bruno | testing | https://www.usebruno.com/ |
| infra/db | postgresql / SQL |  | https://www.postgresql.org/ |
| infra/db | pgAdmin | testing | https://www.postgresql.org/ |
| infra/db | Go | cli/tooling | https://go.dev/ |
| project | jira | project management |  |
| project | squash tm | project management |  |

| dependance | auteur | url
|---|---|---|
| xUnit? | .NET Foundation | https://xunit.net/?tabs=cs |
| PDFPig? | UglyToad | https://www.nuget.org/packages/PdfPig/0.1.17-alpha-202609071845-0d1d6 |
| pq | lib/pq | https://pkg.go.dev/github.com/lib/pq |
| uuid | Google | https://pkg.go.dev/github.com/google/uuid |


# **Invoicika**
## Features présentes dans l'app
- Création de factures
- Envoi par email
- Génération de PDF
- Gestion des clients
- Authentification et authorization
- Gestion de produits
- Connexion et profils
- Images de profils
- Preparation et calculs de TVA automatiques
