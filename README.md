<!-- ![Invoicika](https://im.ages.io/zxV6jintl3) -->



## Installation

Installer Docker<br>
Depuis la racine du projet invoicika :
```ps
docker compose up -d --build ; cd .\_tools\ ; ./dbinjector.exe ; cd ..
```
En cas de reset de la base de données : 
```ps
psql "postgresql://postgres:invoicika!123@localhost:5433/invoicikaDb" -f ./_tools/db_backups/Backup_invoicika_001.sql ; cd .\_tools\ ; ./dbinjector.exe ; cd ..
```
<!-- Ajouter instrcution pour atteindre le localhost du Front -->
<!-- Et les passwords ?  -->
You might see the seeder failed in docker compose log. To make the seeder happend, from your Docker Desktop, stop the backend container and run it again from Invoicika.
Open your browser and navigate to `http://localhost:4444` for the frontend.
Login with `username: admin1, password: admin1` as admin or `username: employee1, password: employee1` as employee. The backend is at `http://localhost:5000/swagger/index.html`

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
- Jasmine, Testing Library Angular
- .NET 10 / C# (xUnit?)
- JIRA, Squash
- Bruno
- SQL & pgadmin/PostGreSQL

- Go (cli & tooling)

- Playwright ?
- PDFPig ?

# **Invoicika**

## Features présentes dans l'app

- **Création de factures**
- Envoi par email
- Génération de PDF
- Gestion des clients
- Authentification et authorization
- Gestion de produits
- Connexion et profils
- Images de profils
- TVA
