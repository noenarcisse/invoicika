# **Invoicika**
Invoicika est une application de facturation qui permet à une entreprise de gérer des clients et des produits avec leur stocks pour générer et émettre des factures par email.

Documentation de l’app par le développeur :<br>
https://github.com/noenarcisse/invoicika/blob/main/README_init.md

## Features annoncées dans l'app
- Création de factures
- Envoi par email
- Génération de PDF
- Gestion des clients
- Authentification et authorization
- Gestion de produits
- Inscription, connexion et profils
- Images de profils
- Preparation et calculs de TVA automatiques

# Specs de l'application
Architecture frontend, backend et base de données détachés, le tout est containerisé en une composition avec Docker.
Backend ASP.NET en MVC.
Authentification avec jeton JWT.

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
