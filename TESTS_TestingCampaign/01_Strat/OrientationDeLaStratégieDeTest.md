# Orientation de la stratégie de test
La stratégie principale va être axée sur du Risk Base Testing car même s’il n’y a pas de transfert d’argent direct, un service de facturation demande une rigueur absolue pour la justesse des données, maintenir un climat de confiance avec le client. Cela reste aussi un outil de communication qui permet de donner une image sérieuse et professionnelle de l’entreprise auprès des partis externes. <br/>
De plus, une factuure va entraîner en réaction un paiement de la part du client.

Le Risk Based Testing permet aussi de mieux cadrer les priorités de la campagne de test dans un délai qui reste relativement court.

## Stratégie principale : RBT
Tests a considerer :
- Arrondis (règle bancaire vs arrondi classique)
- Virgule flottante informatique vs finances
- Idempotence : les mêmes données de facturation doivent toujours donner le même résultat et une facture unique.
- Épuisement des stocks : les produits encodés dans la base de données sont limités. On ne doit jamais pouvoir descendre en négatif et acheter des stocks inexistants.
- Respect de la norme EN 16931 : Numérotation séquentielle des factures (obligatoire dans plusieurs juridictions, dont la France/Belgique)
- Mentions légales obligatoires sur le document (règles d’arrondis utilisés si nécéssaire)
- Race conditions sur les stocks des produits enregistrés


- Traçabilité : chaque facture doit être immuable une fois émise (contraintes légales dans beaucoup de pays)
- Conservation et archivage (durée légale)
- Facturation en masse (fin de mois, tous les abonnements le même jour) (load test)

### Test basé sur la conformité (Compliance-Based Testing)
A cela doit être ajoutée une seconde stratégie pour vérifier le bon respect légal des factures émises sous la forme d'une liste de validation. <br>
Les éléments dans cette liste ne sont pas optionnels.

    DRAFT
    Sur de la facturation, certaines choses ne sont pas "à risque business" mais "obligatoires légalement" (numérotation séquentielle, mentions légales, TVA). Même si le risque métier est faible, le risque juridique est non-négociable. Ça mérite sa propre checklist, indépendante de la matrice de criticité.

## Stratégies secondaires :
Je compte garder comme stratégie viable et intéressantes mais dépendantes du temps
### Test basé sur les données (Data-Driven / Boundary Testing)
    DRAFT
    Très pertinent pour la facturation : les bugs viennent souvent des cas limites numériques (montant à 0, montant négatif après remboursement, arrondi à la limite du centime, devise avec 0 décimales comme le Yen). Tu combines ça avec le RBT — tu identifies quelles zones à risque nécessitent un test aux limites approfondi.
### Tests exploratoires
    DRAFT
    Sur un module financier, une session exploratoire (sans script prédéfini) menée par quelqu'un qui connaît bien le métier trouve souvent des scénarios que personne n'a pensé à écrire (ex: résiliation + remboursement + changement de plan le même jour). Complément utile après avoir couvert les risques identifiés.

## Acteurs
- **Employé** : Gère les produits, clients, stock, factures
- **Administrateur** : Meme droits que les employés. <br>
A des droits en plus comme modifier des profils des autres admins et employés.<br>
Voient la partie “users”


## Regles metier : RM


| ID | Nom de la règle métier | Descr |
|---|---|---|
| RM01 | Email | Format email, validation email fonctionnel? |
| RM02 | Telephone | Numéro de téléphone format valide |
| RM03 | TVA | TVA valeur limite et légale |
| RM04 | Stocks | Produits avec stock de disponibilité, race condition / epuisement |
| RM05 | Factures | Idempotence, une facture doit être unique, traçable et reproductible |
| SEC01 | Injections | Les inputs utilisateurs sont affichés dans un dashboard html (sécurité / injection) |
| SEC02 | Droits | DRAFT Admins ont des droits sur le dashboard et les users absurdes. |