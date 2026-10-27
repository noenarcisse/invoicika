# **Testing Stack**
<!-- Manque le CI CD -->
<!-- Git Github ? Git actions ? -->

## Création de tests
| outil | utilisation
|---|---|
| xUnit | tests composants, tests integration db 
| Shouldly | assertion, tests composants et integration
| NSubstitute | mocks
| Testcontainers & Docker | tests d'integration de db
| Npgsql/EF Core | tests d'integration de db
| NBomber | test de charge API
| Bruno | tests API
| Playwright | tests E2E, tests de composants Frontend
| OUT Jasmine, Karma | tests unitaires
| OUT?Testing Library Angular | tests unitaires

## Exploration
| outil | utilisation
|---|---|
| PostgreSQL & pgAdmin | exploration db
| DevTools | exploration API 
| SonarQube & Sonar scanners | analyse statique 

## Gestion de projet et de campagne de tests
| outil | utilisation
|---|---|
| Jira | Gestion de projet, reports de bugs
| SquashTM | Gestion de la campagne de tests

## Infra, source control et CI/CD
| outil | utilisation
|---|---|
| Git, GitHub, Fork, GitHub Desktop | Source control 
<!-- | GitHub Actions ? | CI/CD -->


## Dépendences
| package |
|---|
| Microsoft.NET.Test.Sdk |
| Testcontainers.PostgreSql |
| Npgsql.EntityFrameworkCore.PostgreSQL |
| xUnit3 |
| Shouldly |
| NSubstitute |
| pqgithub.com/lib/pq |
| github.com/google/uuid |
<!-- | coverlet | -->
<!-- | PDFPig? | -->