# Charte de Test Globale

Ce document formalise la stratégie de test qui guidera l'ensemble des activités QA sur le produit **EventFlow** durant toute la durée du projet.

## 1. Définition du Périmètre de Test (Scope)

Il s'agit de cartographier précisément ce qui doit être testé (En Périmètre) et ce qui est volontairement exclu de notre campagne de test directe (Hors Périmètre).

### Périmètre (In-Scope)
- 

### Périmètre BONUS
- PDF des factures générés

### Hors Périmètre (Out-of-Scope)
- Emails

## 2. Critères d'Entrée et de Sortie (Qualité des Processus)

Les critères d'entrée et de sortie sécurisent le flux de travail QA pour éviter de tester un produit instable ou de livrer un produit contenant des anomalies majeures.

### Critères d'Entrée

Pour que l'équipe QA commence à exécuter les tests sur un environnement donné, les conditions suivantes doivent être réunies :

<!-- docker qui tourne, enviro fonctionnel, les containers se lancent -->
<!-- components fonctionnels -->
- 

### Critères de Sortie

Pour déclarer la campagne de test terminée et donner un avis favorable (Go) pour la mise en production, il faut :
<!-- minimum une couverture de 100% et PASS sur les test CRIT, HIGH et 100% sur les MED avec au moins 50% de PASS ?  -->
- 

## 3. Matrice de Risques Produit (Priorisation Risk-Based Testing)

<!-- TODO provient du template a adapter -->

La stratégie repose sur le *Risk-Based Testing* : nous testons en priorité ce qui peut détruire la valeur métier ou bloquer l'argent.

**Formule de calcul :** Criticité (C) = Probabilité (P) X Impact (I) *(Échelle de 1 à 3)*

| ID Risque | Fonctionnalité ciblée | Description de l'échec potentiel | P | I | Criticité | Stratégie d'atténuation QA (Réponse) |
|---|---|---|---|---|---|---|
| **R-01** | **Tunnel / Stock** | Vente de billets supérieure à la capacité de la salle lors d'un pic d'achat (Race condition). | 3 | 3 | | |
| **R-02** | **Sécurité Billets** | Un utilisateur modifie l'ID dans l'API et télécharge les billets d'un tiers (IDOR). | 2 | 3 | | |
| **R-03** | **Tunnel / Limites** | Contournement de la limite de 6 billets par commande en attaquant l'API en direct. | 2 | 2 | | |
| **R-04** | **Panier / Temps** | Le stock reste bloqué définitivement après l'abandon d'un panier (Échec d'expiration). | 2 | 2 | | |
| **R-05** | **Paiement** | Écart d'arrondi ou de calcul entre le total affiché et le montant réellement prélevé. | 1 | 3 | | |
