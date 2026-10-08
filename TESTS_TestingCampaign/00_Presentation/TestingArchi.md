# Architecture de la campagne de tests

## JIRA
Epic -> Sections exposées par le site
Label Scouting -> les elements trouvés en scouting, requiert un second passage apres tri des RM

## Squash:
Exigences -> RM + autre regles non func (voir Exigences non fonctionnelles dans l'orientation de la strat)


## Tests externes
Tous les tests de la campagne utilisant des outils externes se situe dans un dossier de tests externes. Cela inclut : des fichiers SQL, des fichiers YAML de Bruno, des scripts E2E de Playwright.

## Tests internes
Les tests qui ont des dépendences ou qui doivent se ratacher au projet dev viennent se greffer en suivant l'architecture de l'écosystème ciblé:
- .spec.ts pour les composants avec Angular & Jasmine
- /App.Tests/ pour les composants en .NET
- /Db.Tests/ pour les tests d'intégration de DB