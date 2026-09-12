<!-- ![Invoicika](https://im.ages.io/zxV6jintl3) -->


## Installation

Installer Docker<br>
https://www.docker.com/products/docker-desktop/

Depuis la racine du projet invoicika :
```ps
docker compose up -d --build ; cd .\_tools\ ; ./dbinjector.exe ; cd ..
```
En cas de reset de la base de données : 
```ps
psql "postgresql://postgres:invoicika!123@localhost:5433/invoicikaDb" -f ./_tools/db_backups/Backup_invoicika_001.sql ; cd .\_tools\ ; ./dbinjector.exe ; cd ..
```

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

Modifs apportées au projet initial
- Changement de port pour la DB sur 5433 pour eviter les conflits avec un eventuel postgres natif sur la machine hote
- Mise a jour le docker-compose.yml pour eviter les migration a la main de MS SQL -> PostGres
- Ajout d'un injecteur de DB pour remplacer les noms des Customers entrés par le dev qui sont des acteurs de films un peu trop romantiques.

# **Tech Stack**

- Node
- Angular 16
- NG-Zorro
- ASP.NET Core
- .NET 10
- PostGreSQL
- Git & Github

# **Testing Stack**

<!-- Manque le CI CD -->
<!-- Git Github ? Git actions ? -->

| couche | name | use | url
|---|---|---|---|
| frontend | Jasmine & Karma | testing | https://angular.dev/guide/testing/karma |
| frontend | Testing Library Angular | testing | https://testing-library.com/docs/angular-testing-library/intro |
| frontend | Playwright? |  |  |
| backend |.NET 10.0 / C# | testing | https://dotnet.microsoft.com/fr-fr/ |
| backend | xUnit? | testing | https://xunit.net/?tabs=cs |
| backend/api | Bruno | testing | https://www.usebruno.com/ |
| infra/db | postgresql / SQL |  | https://www.postgresql.org/ |
| infra/db | pgAdmin | testing | https://www.postgresql.org/ |
| infra/db | Go | cli/tooling | https://go.dev/ |
| infra/db | pq | tooling | https://pkg.go.dev/github.com/lib/pq |
| project | jira | project management |  |
| project | squash tm | project management |  |
| ? | PDFPig | testing | https://www.nuget.org/packages/PdfPig/0.1.17-alpha-202609071845-0d1d6 |

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
