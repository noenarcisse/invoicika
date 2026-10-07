# **Testing Stack**

<!-- DRAFT en cours, faut relire et voir les derniers elements qui manquent -->

<!-- Manque le CI CD -->
<!-- Git Github ? Git actions ? -->

## Zones de tests

| zone | outils
|---|---|
| composant frontend | Jasmine, Karma, Testing Library Angular
| composant backend | xUnit, Shouldly, NSubstitute
| integration db | xUnit, Shouldly, Testcontainers, Npgsql/EF Core, Docker
| données | SQL, PostgreSQL, pgAdmin
| API | Bruno, DevTools
| E2E | Playwright


## Outils externes

| zone | outils
|---|---|
| Gestion de test et de projet | Jira, SquashTM
| Source control et CI | Git, GitHub, GitHub Actions (à venir), Fork, GitHub Desktop
| IDE | VS Code, Visual Studio 2026
| Clients | Docker Desktop, pgAdmin
| Analyse statique | SonarQube, Sonar scanners

## Outils internes

| zone | outils
|---|---|
| tooling | cli.exe
| injection db | injectdb.exe
| tracking | draft.exe
| tooling | pq
| tooling | uuid

## Langages

| lang | utilisé pour
|---|---|
| C# / .NET | unitaire backend, intégration DB, API
| TypeScript/Node.js | unitaire front, E2E
| SQL (PostgreSQL) | données, intégration DB
| Go | outils internes

<!-- ## Frontend

| couche | nom | utilisation | url
|---|---|---|---|
| frontend | Typescript | tests | https://www.typescriptlang.org/ |
| frontend | Jasmine & Karma | tests de composants | https://angular.dev/guide/testing/karma |
| frontend | Testing Library Angular | tests de composants | https://testing-library.com/docs/angular-testing-library/intro |

## Backend

| couche | nom | utilisation | url
|---|---|---|---|
| backend |.NET 10.0 / C# | tests | https://dotnet.microsoft.com/fr-fr/ |
| backend | Bruno | tests api | https://www.usebruno.com/ |
| backend | xUnit3 | tests composants | https://xunit.net/?tabs=cs |
| backend | Shouldly | tests composants | https://docs.shouldly.org/ |
| backend | Nsubstitute | mocks | https://nsubstitute.github.io/ |

## DB
| couche | nom | utilisation | url
|---|---|---|---|
| infra/db | postgresql / SQL | exploration des données et de la db, changement d'état, dumps | https://www.postgresql.org/ |
| db | pgAdmin | exploration des données et de la db | https://www.pgadmin.org/ |
| db | Docker | creation de db de test containeurisée | https://www.docker.com/ |
| db | Shouldly | unit tests | https://docs.shouldly.org/ |
| db | TestContainer | creation de db de test containeurisée | https://testcontainers.com/ |
| db | Npgsql | driver psql C# | https://www.npgsql.org/efcore/?tabs=onconfiguring |
| tooling | Go | runtime des outils internes | https://go.dev/ |
| tooling | pq | driver psql Go | https://pkg.go.dev/github.com/lib/pq |
| tooling | uuid | génération d'uuid | https://pkg.go.dev/github.com/google/uuid |
| tooling | injectdb.exe | injection de base de données | https://go.dev/ |

## Project
| couche | nom | utilisation | url
|---|---|---|---|
| project | jira | project management | https://www.atlassian.com/fr/software/jira |
| project | squash tm | project management | https://tm-fr.doc.squashtest.com/latest/ |
| infra | Docker | conteneurisation | https://www.docker.com/ |
| infra | Git | source control | https://git-scm.com/ |
| infra | Github | Host git | https://github.com/ |
| tooling | Go | runtime des outils internes | https://go.dev/ |
| tooling | cli.exe | installation, reset, changement d'état du projet et de la db | / |
| tooling | draft.exe | tracage et logs des commentaires de draft / todo dans les fichiers MD | / |

## Others
| couche | nom | utilisation | url
|---|---|---|---|
| e2e | Playwright | tests E2E | https://playwright.dev/ |
| audit | SonarQube Community build | static analysis | https://www.sonarsource.com/ |
| infra | Github desktop| version control | https://github.com/apps/desktop?locale=fr-fr |
| infra | Fork | version control | https://git-fork.com/ |
| infra | Docker desktop | gestion des images et containers | https://www.docker.com/products/docker-desktop/ |
| IDE | VSCode | creation de tests | https://code.visualstudio.com/ |
| IDE | Visual Studio 2026 | creation de tests + tests explorer | https://visualstudio.microsoft.com/ |
| ? | PDFPig | tests de pdf ? | https://www.nuget.org/packages/PdfPig/0.1.17-alpha-202609071845-0d1d6 |

 -->
