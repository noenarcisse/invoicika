# Charte de Test Globale

Ce document formalise la stratégie de test qui guidera l'ensemble des activités QA sur le produit **Invoicika** durant toute la durée du projet.

## 1. Définition du Périmètre de Test (Scope)

Il s'agit de cartographier précisément ce qui doit être testé (En Périmètre) et ce qui est volontairement exclu de notre campagne de test directe (Hors Périmètre).

### Périmètre (In-Scope)
- Dashboard:  informations correctes affichées et enregistrées
- Gestion des produits et clients.
- Authentification & Roles respectés sur les pages et dans l'API
- Calcul de prix et application de TVA
- Profil utilisateur
- Images et uploads
- Génération de factures
- CRUD dans la base de données
- Frontend (angular avec testing library)
- API (Swagger disponible)


### Périmètre BONUS
- Generation de PDFs et leur contenu (avec PdfPig). Je le considère comme un périmètre intéressant à tester car c’est le but premier pour le client qui souhaite utiliser cette app. <br>
Il est mis à l'écart car il ne permet pas de tester le code de l’app mais ce qui en sort en E2E.

### Hors Périmètre (Out-of-Scope)

- .NET : Code généré, migration de DB
- Injection de seed, data (vu en passant dans le Backend)
- La feature lié à l’envoi de mail

## 2. Critères d'Entrée et de Sortie

### Critères d'Entrée
Pour commencer à exécuter les tests sur un environnement donné, les conditions suivantes doivent être réunies :

- Le code compile.
- La feature est implémentée et fonctionnelle dans la couche testée.
- Les containers Docker tournent et leur communication fonctionnent.
- Les ports nécéssaire des containers sont ouverts sur la machines local sans conflits.

Les tests ne seront pas lancés et la feature sera passée en bloquée dans le cas contraire.


### Critères de Sortie
Pour déclarer la campagne de test terminée et donner un avis favorable (Go) pour la mise en production, il faut :
|  | Couverture | Taux de PASS | 
|---|---|---|
| CRIT | 100% | 100% |
| HIGH | 100% | 100% | 
| MED | 100% | 50% | 
| LOW | ? | ? |


## 3. Matrice de Risques Produit (Priorisation Risk-Based Testing)

La stratégie principale s'appuie sur le *Risk-Based Testing* étant donné l'aspect financier indirect. On ne génère pas un paiement mais on le provoque, les chiffres doivent donc être corrects.

https://github.com/noenarcisse/invoicika/blob/main/TESTS_TestingCampaign/01_Strat/OrientationDeLaStratégieDeTest.md

<!-- TODO provient du template a adapter -->
<!-- reecrire avec des risques, pas les RM ou des solution evidemment -->
**Formule de calcul :** Criticité (C) = Probabilité (P) X Impact (I) *(Échelle de 1 à 3)*

| ID Risque | RM | Fonctionnalité | Description de l'échec potentiel | P | I | C |
|---|---|---|---|---|---|---|
| **R-01** | RM01 | **Customers** | Email invalide, le client ne recoit jamais sa facture | 3 | 3 | 9 |
| **R-02** | RM02 | **Customers** | Le téléphone d'un client est invalide, impossible de le contacter | 3 | 1 | 3 |
| **R-03** | RM04 | **Items** | Un client tente de commander plus d'objets que disponibles dans les stocks | 3 | 2 | 6 |
| **R-04** | RM04 | **Items** | Plusieurs clients tentent d'acheter trop d'objets en meme temps et dépasse le stock d'objet maximum (race condition) | 2 | 2 | 4 |
| **R-05** | RM?? | **Invoices** | Erreur d'arrondi entre l'arrondi bancaire et l'arrondi mathématique | 3 | 3 | 9 |
| **R-06** | RM05 | **Invoices** | Duplicata de facture, 2 mêmes sets de données donnent 2 factures différentes | 2 | 3 | 6 |
| **R-07** | RM06 | **Users** | Plusieurs utilisateurs s'insrivent avec le même emails et créent des collisions. | 2 | 3 | 6 |
| **R-08** | RM07 | **Customers & Users** | Plusieurs clients ou utilisateurs ont le même identifiant et créent des collisions | 1 | 3 | 3 |
| **R-09** | RM08 | **Invoices** | Une facture émise se fait altérer par des modifications de prix d'objet ou de TVA. | 3 | 3 | 9 |
| **R-10** | RM09 | **Invoices** | Montant total correspond au nombre d'objets multipliés par le prix d'un objet et applique la TVA associée | 2 | 3 | 6 |
| **R-11** | SEC01 | **Users** | Un utilisateur exécute une injection XSS dans un formulaire "User" | 2 | 3 | 6 |
| **R-12** | SEC03 | **Users** | IDOR un utilisateur peut accéder et modifier les données d'un autre | 3 | 3 | 9 |
| **R-13** | SEC02 | **Roles** | Un "employee" a des autorisations plus importante qu'un "admin" | 2 | 3 | 6 |
| **R-14** | SEC05 | **Users** | Un utilisateur uploade une image trop grande. (Dos par saturation) | 2 | 2 | 4 |
| **R-15** | SEC05 | **Users** | Un utilisateur uploade un fichier autre qu'une image | 1 | 2 | 2 |
| **R-16** | SEC06 | **Users** | Un utilisateur ecrit une injection SQL dans un formulaire | 2 | 2 | 4 |
| **R-17** | SEC04 | **Users** | Mots de passe stockés en clair | 1 | 3 | 3 |
| **R-18** | SEC07 | **Users** | CSRF | 2 | 2 | 4 |

| **R-18** | ACC07 | **Users** | Le système accepte un mot de passe faible (court, courant ou sans complexité) | 3 | 3 | 9 |
| **R-18** | ACC08 | **Users** | Un pirate tente de bruteforcer la page de Login | 3 | 3 | 9 |
| **R-18** | SEC08 | **Users & Customers** | Une réponse API ou un log renvoie des données sensibles en clair (mot de passe, email, JWT etc.) | 2 | 2 | 4 |
| **R-18** | RM11 | **Items & Invoices** | Un employee rentre une quantité négative sur un stock | 2 | 3 | 6 |
| **R-18** | RM12 | **Items & Invoices** | Un utilisateur supprime un client ou un objet référencé par une facture et toutes les factures associées | 3 | 3 | 9 |
| **R-18** | RM12 | **User & Customers & Items & Invoices** | Les suppressions en DB sont physique (définitives) et non logiques sur des infos importantes | 3 | 3 | 9 |


<!-- draft -->
Stratégie de test / type de test (unitaire, intégration, E2E, sécurité)
Cas de test associé / référence (TC-xx)
Priorité ou niveau de couverture dérivé de C (ex. C ≥ 6 → test obligatoire)
Statut / responsable

<!-- DRAFT risque possible encore  -->
Authentification : brute force, politique de mot de passe, gestion de session / expiration du token
-Suppression d’un client ou d’un item référencé par une facture (intégrité référentielle)
-Facture avec quantité ≤ 0 ou prix négatif
Gestion de la TVA : taux incorrect ou changement de taux
Concurrence sur la numérotation des factures (trou ou doublon de numéro)
Perte de données / indisponibilité de l’envoi d’email (échec d’envoi silencieux)
-CSRF (vous couvrez XSS et SQL mais pas CSRF)
-Exposition de données sensibles dans les logs ou réponses API
Fonctionnalité Roles : seul R-12 est couvert, rien sur l’attribution des rôles

## 4. Checklist de Compliance
Le second axe de test sera de la Compliance based testing.

Secondairement, de par la nature d'une facture sur le plan juridique et légal, une checklist non optionnelle viendra compléter le RBT. Cela permettra de respecter les législations où les factures peuvent être utilisée et éviter des amendes pour le client.

<!-- add checklist!! -->
- item1
- item2