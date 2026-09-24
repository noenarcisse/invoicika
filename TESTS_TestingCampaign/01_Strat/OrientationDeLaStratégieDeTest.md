# Orientation de la stratégie de test

<!-- todo -->
<!-- ajouter la logique de decoupe des epics baséee sur les "slices" du menu -->

Pour l'ensemble de la stratégie, je vais agir comme un tester externe, amené à tester l'application selon le modèle "Waterflow" car c'est ce qui est le plus proche de la réalité en venant tester un produit Open-source délivré il y a déjà 2 ans sur Github.

Avec cette approche, je n'aurai que peut de manière de vérifier la régression et le pesticid paradox, arrivant en fin de cycle sans correction de "l'équipe dev" imaginaire.

La stratégie principale va être axée sur du Risk Base Testing car même s’il n’y a pas de transfert d’argent direct, un service de facturation demande une rigueur absolue pour la justesse des données, maintenir un climat de confiance avec le client. Cela reste aussi un outil de communication qui permet de donner une image sérieuse et professionnelle de l’entreprise auprès des partis externes. <br/>
De plus, une factuure va entraîner en réaction un paiement de la part du client.

Le Risk Based Testing permet aussi de mieux cadrer les priorités de la campagne de test dans un délai qui reste relativement court.

## Stratégie principale : RBT
Tests a considerer :
- Arrondis (règle bancaire vs arrondi classique)
- Virgule flottante informatique vs finances
- Idempotence : les mêmes données de facturation doivent toujours donner le même résultat et une facture unique.
- Épuisement des stocks : les produits encodés dans la base de données sont limités. On ne doit jamais pouvoir descendre en négatif et acheter des stocks inexistants.

<!-- DRAFT -->
- Respect de la norme EN 16931 : Numérotation séquentielle des factures (obligatoire dans plusieurs juridictions, dont la France/Belgique)
- Mentions légales obligatoires sur le document (règles d’arrondis utilisés si nécéssaire)
- Race conditions sur les stocks des produits enregistrés
<!-- DRAFT -->
- Traçabilité : chaque facture doit être immuable une fois émise (contraintes légales dans beaucoup de pays)
- Conservation et archivage (durée légale)
- Facturation en masse (fin de mois, tous les abonnements le même jour) (load test)

### Test basé sur la conformité (Compliance-Based Testing)
A cela doit être ajoutée une seconde stratégie pour vérifier le bon respect légal des factures émises sous la forme d'une liste de validation. <br>
Même si les risques ici ne pas à proprement parler des règles métier, il s'agit quand même de risques légaux, obligatoires en fonction des pays où sont émises les factures et pouvant entrainer des amendes pour les clients utilisant l'app.
Les éléments dans cette liste sont liés à des règles fonctionnelles mais ne sont pas jamais optionnels.

## Stratégies secondaires :
Je compte garder comme stratégie viable et intéressantes mais dépendantes du temps
### Test basé sur les données (Data-Driven / Boundary Testing)
<!-- draft cleaner writing to be done -->
Insister sur les valeurs limites comme le moindre nombre présent sur la facture doit être juste. Choix pertinents aussi pour accumuler et swap des datasets ?
### Tests exploratoires
<!-- draft cleaner writing to be done -->
Les tests exploratoires ponctuels seront exécutés pour chercher des defauts possibles de manière plus créatives ou chercher les erreurs possibles basées sur de la documentation légal / métier lié au principe des facturations ou de règles financière possiblement non reprise dans les RM établies au départ.
Complémentaire 

## Acteurs
- **Employé** : Gère les produits, clients, stock, factures
- **Administrateur** : Meme droits que les employés. <br>
A des droits en plus comme modifier des profils des autres admins et employés.<br>
Voient la partie “users”

## Parcours typique par role
### Employé
S'inscrit sur la plateforme
Se connecte
Creer, modifie, supprime des clients
Creer, modifie, supprime des factures
Générer la facture en PDF ou envoyer la facture par email
Modifie son profil pour changer son mot de passe ou sa photo
### Administateur
Se connecte
Cree, modifie ou supprime des objets
Creer, modifie, supprime des clients
Creer, modifie, supprime des factures
Générer la facture en PDF ou envoyer la facture par email
Gère les autres users (role, changement d'informations)

## Exigences fonctionnelles
Inscription
Connexion
Génération de facture
Envoi de facture
<!-- todo -->

## Regles metier : RM
<!-- DRAFT ne pas mélanger les usages : l'email sert de login (unique en db mais sans plus)
mais aussi de contact pour l'envoi de facture (CRIT!) requiert une validation!
 -->
<!-- add les legal ici ! -->
| ID | Nom de la règle métier | Descr |
|---|---|---|
| RM01 | Email valide | Format email et confirmation que l'email peut recevoir des emails |
| RM02 | Telephone | Numéro de téléphone format valide |
| RM03 | TVA | TVA valeur limite et légale |
| RM04 | Stocks | Produits avec stock de disponibilité, race condition / epuisement |
| RM05 | Factures | Idempotence, une facture doit être unique, traçable et reproductible |
| RM06 | Email unique | L'email sert d'identifiant de login et doit etre unique en base de données |


## Exigences non fonctionnelles
| ID | Nom de l'exigence | Descr |
|---|---|---|
| SEC01 | Injections | Les inputs utilisateurs sont affichés dans un dashboard html (sécurité / injection) |
| SEC02 | Droits | Le role "user" n'a pas de privilèges qui dépasse le role "admin" |
| SEC03 | Droits | DRAFT Les utilisateurs n'ont pas acces et ne peuvent pas modifier des informations chez les autres (IDOR?) |