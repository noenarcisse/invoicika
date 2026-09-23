# Charte de Test Globale

Ce document formalise la stratégie de test qui guidera l'ensemble des activités QA sur le produit **Invoicika** durant toute la durée du projet.

## 1. Définition du Périmètre de Test (Scope)

Il s'agit de cartographier précisément ce qui doit être testé (En Périmètre) et ce qui est volontairement exclu de notre campagne de test directe (Hors Périmètre).

### Périmètre (In-Scope)
<!-- todo -->
- Dashboard:  informations correctes affichées et enregistrées
- Gestion des produits et clients.
- Authentication & Roles respecté sur les pages et les permissions.
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
**Formule de calcul :** Criticité (C) = Probabilité (P) X Impact (I) *(Échelle de 1 à 3)*

| ID Risque | RM | Fonctionnalité | Description de l'échec potentiel | P | I | C |
|---|---|---|---|---|---|---|
| **R-01** | RM01 | **Customers** | Email invalide, le client ne recoit jamais sa facture | 3 | 3 | 9 |
| **R-02** | RM02 |**Customers** | Le téléphone d'un client est invalide, impossible de le contacter | 3 | 1 | 3 |
| **R-03** | RM04 | **Items** | Un client tente de commander plus d'objets que disponibles dans les stocks | ? | ? | ? |
| **R-04** | RM04 |**Items** | Plusieurs clients tentent d'acheter trop d'objets en meme temps et dépasse le stock d'objet maximum | ? | ? | ? |
| **R-05** | RM?? |**Invoices** | Erreur d'arrondi entre l'arrondi bancaire et l'arrondi mathématique | ? | ? | ? |
| **R-06** | RM05 |**Invoices** | Duplicata de facture, 2 memes sets de données donnent 2 factures différentes | ? | ? | ? |
| **R-07** | SEC03 |**Users** | IDOR un utilisateur peut accéder et modifier les données d'un autre | ? | ? | ? |
| **R-08** | SEC02 |**Roles** | Un employee a des auth >= qu'un admin | ? | ? | ? |


## 4. Checklist de Compliance
Le second axe de test sera de la Compliance based testing.

<!-- DRAFT -->
Secondairement, de par la nature légale ??? d'une facture, une checklist non optionnelle viendra compléter le RBT. Cela permettra de respecter les législations où les factures peuvent être utilisée et éviter des amendes pour le client.

<!-- add checklist!! -->
- item1
- item2