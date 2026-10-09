# Architecture de la campagne de tests

## JIRA
Les Epics regroupent des sections exposées par le site dans le menu. Cela permet de cadrer une forme de découpes par fonctionnalités et de tester verticalement ("Users" va du frontend jusqu'a la base de données).
Cela me permet de rapidement passer en blocage des zones de tests qui ne respectent pas les critères d'entrée.

Le Label "Scouting" permet de grouper les elements trouvés pendant la phase de scouting. Les reports fait pendant cette phase sont de l'exploration courte et requierent un second passage apres tri des règles métier.

## Squash
Le SquashTM centralise la campagne de test et les designs, executions, rapport etc.
Il montre les exigences, RM + autre regles non func (voir Exigences non fonctionnelles dans l'orientation de la strat)

Le dossier 02_Design vient en appui dans le cas ou des documents additionnels viendraient appuyer un Test Case dans Squash.
Le dossier 03_Exec contient les fichiers produits directement reliés à des cas de test (notes additionnelles, logs, screeshots ou autres).

## Tests externes
Tous les tests de la campagne utilisant des outils externes se situent dans un dossier de tests externes. Cela inclut : des fichiers SQL, des fichiers YAML de Bruno, des scripts E2E de Playwright.

## Tests internes
Les tests qui ont des dépendences ou qui doivent se ratacher au projet dev viennent se greffer en suivant l'architecture de l'écosystème ciblé:
- .spec.ts pour les composants avec Angular & Jasmine
- /App.Tests/ pour les composants en .NET
- /Db.Tests/ pour les tests d'intégration de DB