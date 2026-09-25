# Orientation de la stratégie de test

Pour l'ensemble de la stratégie, je vais agir comme un testeur externe, amené à tester l'application selon le modèle "Waterflow" car c'est ce qui est le plus proche de la réalité en venant tester un produit Open-source délivré il y a déjà 2 ans sur Github.

Avec cette approche, je n'aurai que peu de manière de vérifier la régression et le pesticid paradox, arrivant en fin de cycle sans correction de "l'équipe dev" imaginaire.

La stratégie principale va être axée sur du Risk Base Testing car même s’il n’y a pas de transfert d’argent direct, un service de facturation demande une rigueur absolue pour la justesse des données, maintenir un climat de confiance avec le client. Cela reste aussi un outil de communication qui permet de donner une image sérieuse et professionnelle de l’entreprise auprès des partis externes. <br/>
De plus, une facture va entraîner en réaction un paiement de la part du client.

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

Les exigences fonctionnelles sont triées par catégories afin de les regrouper de manière logique : Client, Compte, Facturation et Produit
La catégorie "PDF" en scope bonus ne sera exécutée que si les conditions pour le passage en Bonus sont remplies.
"Envoi email" est hors scope dans le cadre de cette campagne et ne sera jamais exécuté. Les exigences qui font partie de cette catégorie sont relevées pour la cohérence ou une seconde campagne de test non prévue ici.

| ID | Exigence |
|---|---|
| CUS01 | Créer, modifier, consulter, supprimer un client |
| ACC01 | Inscription d'un utilisateur |
| ACC02 | Connexion d'un utilisateur |
| ACC03 | Fin de session d'un utilisateur |
| ACC04 | Modification du profil d'un utilisateur |
| ACC05 | Upload d'une photo de profil |
| ACC0X | Authorisations différenciées entre administrateurs et employés |
| INV01 | Créer une facture (lignes, lignes de groupe, client, TVA) |
| INV02 | Consulter, modifier, lister les factures |
| INV03 | Gérer le statut d'une facture (brouillon, envoyée...) |
| INV04 | Appliquer une TVA à une facture |
| PRO01 | Créer et gérer des produits |

## Regles metier : RM
<!-- DRAFT ne pas mélanger les usages : l'email sert de login (unique en db mais sans plus)
mais aussi de contact pour l'envoi de facture (CRIT!) requiert une validation!
 -->
| ID | Nom de la règle métier | Descr |
|---|---|---|
| RM01 | Email valide | Format email et confirmation que l'email peut recevoir des emails |
| RM02 | Telephone | Numéro de téléphone format valide |
| RM03 | TVA | TVA valeur limite et légale |
| RM04 | Stocks | Produits avec stock de disponibilité, race condition / epuisement |
| RM05 | Factures | Idempotence, une facture doit être unique, traçable et reproductible |
| RM06 | Email unique | L'email sert d'identifiant de login et doit etre unique en base de données |
| RM07 | Unicité des ID Utilisateurs/Clients | Un identifiant utilisateur/client est unique |
| RM08 | Facture imuable | Facture émise figée : modification de l'article ou du client sans effet sur elle |
| RM09 | Calcul de la TVA apppliquée | Cohérence des montants : total lignes + groupes = sous-total, sous-total + TVA = total |

<!-- draft de RM en plus -->
| RM0? | Validation des inscrits | L'inscription s'effectue par un simple lien, il faut une validation d'un admin avant de laisser un utilisateur modifier des données sur le site / un statut intermédaire bloqué |
<!-- add les legal ici ! -->

## Exigences non fonctionnelles
| ID | Nom de l'exigence | Descr |
|---|---|---|
| SEC01 | Injections XSS | Les inputs utilisateurs sont affichés dans un dashboard html (sécurité / injection) |
| SEC02 | Autorisation | Un utilisateur ne peut pas modifier les infos des autres (IDOR?) |
| SEC03 | Autorisation | Contrôle d'accès par rôle sur chaque endpoint |
| SEC04 | Mots de passe | Mots de passe stockés hachés |
| SEC05 | DDoS | Upload d'images : type, taille et contenu contrôlés |

# Structure du JIRA et SquashTM

<!-- ajouter la logique de decoupe des epics baséee sur les "slices" du menu -->
<!-- squash et exigences -> regles metier, exigence et rassemblement en zones "compte", facturation etc -->

<!-- DRAFT punk -->
Le JIRA sera structuré sur base des "slices" étant donné que l'application et son menu à une forte découpe par tranche (fort ressemblantes à une logique de VSD).
Cela me permettra d'orienter les zones de l'application complète en incluant aussi bien le frontend, backend, base de données et leur communication en api.
Focus sur une slice plus focus et "spécialisée"
Permet de couper le planning et la gestion de projet plus instable avec des zones de focus qui decoupe l'app en plus petit morceau plus digestes mais qui avec
des frontiere plus amovibles
<!-- DRAFT punk -->
Le SquashTM et ses règles plus stables concernant l'orientation de la stratégie de test, les exigences fixes, les RM etc utilisera des catégorie permettant de regrouper les exigences mais ne seront pas forcément liée a l'app qui pourrait bouger suite a des correctifs éventuels
