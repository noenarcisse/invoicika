# PREP:

## GENERAL
Aller tester l'envoie de mail si ca marche vraiment avec le SMPT (for fun, c'est hors scope anw)

Prep le readme de test, recup les infos de base du readme du dev pour les techs
Ajouter les instructions et modif effectuée pour install

## TESTING
Setup Bruno (hors WEB API ?)
Setup JIRA
Setup Squash
CI CD possible ? reliage avec git ?

## _TOOLS
DB Injector

## BACKEND
sep 2 csproj 1 pour le backend deja la et un pour les Tests
split la solution pour les 2 csproj (remanier l'archi elle est pas bonne)

revoir comment on test en .net avec les 2 csproj separés y'avait des liens a faire dans VS
## FRONT
Fix les vulné possibles : npm audit + i
Installer les 
## DB
Backup_001 (init)
Backup_002 (injected)


# Étape Attendue

Choix de l'application

Cadrage Définir la stratégie, le périmètre et l'analyse de risques.

Développement Réaliser les tests manuels, d'API, l'automatisation et le pipeline.

Rapport Rédiger le rapport de campagne et consolider les métriques.

Soutenance Présenter et défendre le travail devant le jury (jour dédié)

# Deliverable
## 3. Ce que vous devez produire
Vous livrez un dépôt Git unique, structuré et documenté, contenant les éléments suivants.
### 3.1 Stratégie et gestion de test
<ul>
    <li>
        Un plan de test : périmètre, hypothèses, risques, approche basée sur les risques (risk-based), critères d'entrée et de sortie.
    </li>
    <li>
        Une campagne organisée dans un outil de gestion (JIRA/Xray ou Squash TM) avec la traçabilité exigence → cas → exécution →
        anomalie.
    </li>
</ul>

3.2 Test manuel et anomalies
● Des cas de test conçus avec des techniques explicites (partitions d'équivalence, valeurs limites, tests exploratoires).
● L'exécution de ces cas et des rapports d'anomalie exploitables (contexte, étapes, résultat attendu et obtenu, gravité, priorité,
preuve).
3.3 Test d'API
● Une collection Postman ou Bruno couvrant l'authentification (OAuth2/JWT) et au moins un scénario chaîné (connexion →
réservation → paiement, ou équivalent).
● Une suite technique automatisée (PyTest) : cas pilotés par les données, contrôle de conformité de schéma (JSON Schema), et
au moins un cas de sécurité.
3.4 Automatisation de l'interface
● Un framework d'automatisation UI (Playwright ou Selenium) structuré selon le Page Object Model, couvrant le parcours critique
de bout en bout.
● Une gestion des tests instables (attentes robustes, nouvelles tentatives) et des artefacts en cas d'échec (traces, captures).
3.5 Intégration continue
● Un pipeline (GitHub Actions) qui exécute automatiquement les suites de test.
● Des rapports d'exécution (Allure ou équivalent) et une exécution du pipeline visible dans l'historique du dépôt.
3
3.6 Rapport final
● Un rapport de campagne synthétique : métriques (couverture, taux de réussite), bilan des anomalies détectées, analyse des
risques résiduels et recommandations.
4. Consignes et organisation
● Travail strictement individuel. Tout code réutilisé doit être cité.
● Le choix de l'application doit être validé par le formateur avant le début des travaux.
● Le dépôt Git doit avoir un historique de commits lisible et un README expliquant comment installer et exécuter chaque partie.
● Les anomalies détectées doivent être reproductibles : chaque rapport indique comment reproduire le défaut.
● Le pipeline d'intégration continue doit réellement s'exécuter (une exécution verte, ou justifiée, doit être visible).
● La date limite de rendu et le format de dépôt vous sont communiqués votre formateur.

