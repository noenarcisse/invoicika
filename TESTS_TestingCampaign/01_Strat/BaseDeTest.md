# Base de Test

<!-- draft -->
<!-- faut entrer la documentation ici
+ "specification, exigences, user stories"
 -->

 ## Spécifications et règles métier
 ### TVA

 En Belgique ->
 Le calcul de TVA était relax entre ligne par ligne et total avant.
 Maintenant la norme EN 16931 est en application et oblige le calcul de tva uniquement sur le total

 Impossible d'avoir 2 taux de TVA différents dans la meme facture ? j'ai pas reussi a avoir des item groups ?

Contradiction de l'app : 
TVA -> tres EU et national en Europe
utilisé par beaucoup de pays dans le monde mais pas les US par ex.

Norme en EU : La Directive TVA 2006/112/CE
https://eur-lex.europa.eu/eli/dir/2006/112/oj?locale=fr

Aux USA ils ont plutot la Sale tax -> source
https://www.fonoa.com/resources/blog/the-american-exception-why-the-us-has-no-vat-system

USA : 
https://www.pramex.com/implantation-etats-unis/comment-fonctionne-la-tva-aux-usa/

### Devises

Pas de changement de currency bloqué en $ ?! Absurde pour du national, EU, etc hors USA donc partout dans le monde
Il ne semble pas y avoir de différenciations entre USD, CAD et AUD ?
Le manque de possibilité d'adapter les devises rend certains type de commerce impossible ou absurde (intenrnationnal, zone euro etc)

### Obligations légales

La Belgique et l'UE précisent les différentes règles et les cas d'applications pour qu'une facture soit légitime. Une facture doit inclure des informations essentielles (selon son format) et être figée, identifiables et unqiues.
Cela signifie que le document doit notamment reprendre :

- Le type de structure du vendeur, sa forme juridique
- Le numméro de TVA du vendeur
- Le numméro de TVA du client dans le cadre du B2B
- L'adresse du client (sauf dans le cadre d'une facture simplifiée). Cela reste utile et pragmatique dans ce cadre, afin de pouvoir livrer le produit au client
- Un facture doit être conservée jusqu'à 10 ans

La Belgique depuis peu imoose l'utilisation de Peppol pour les factures électroniques B2B ou B2G. Je ne l'ai pas considéré dans le cadre de cette campagne de test car l'app a été réalisée avant l'introduction de cette loi. Si une mise à jour devait être faite, il faudra surement prendre en compte cette nouvelle contrainte.

<!-- draft -->
Dans le cadre du B2C, le format d'une facture électronique conserve plus de souplesse. La norme européenne EN 16931 n'est pas en application.


https://www.myfid.be/ressources/comptabilite/factures-tva/#les-mentions-obligatoires-a-faire-figurer-sur-une-facture-tva

https://synobat.com/be-fr/blog/les-mentions-obligatoires-d-une-facture-en-belgique-le-guide-de-la-facture-conforme

https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/pages/467108874/eInvoicing+Country+Factsheets+for+each+Member+State+and+other+countries

https://www.mediaatelier.com/fr-BE/Posts/EInvoicing-EU/

https://info.hub.brussels/guide/assurances-fiscalite-comptabilite/facturation-electronique-bruxelles


BE + B2C :

<!-- IA, relire, sourcer, reecrire -->
Mentions Légales Obligatoires pour une Facture B2C en Belgique
Une facture adressée à un consommateur particulier (B2C) doit comporter un ensemble de mentions obligatoires pour être valide sur le plan fiscal, juridique et commercial.
---
1. Informations sur le Vendeur (Votre entreprise)
Dénomination sociale ou Nom et Prénom (si entreprise individuelle)
Adresse du siège social (ou lieu d'établissement principal)
Forme juridique (ex. SRL, SA, SC) et mention du Registre des Personnes Morales (ex. RPM Bruxelles)
Numéro d'entreprise / TVA (ex. `BE 0123.456.789`)
Coordonnées bancaires (IBAN et code BIC)
---
2. Informations sur la Facture et la Transaction
Date d'émission de la facture
Numéro séquentiel unique (numérotation continue sans interruption)
Date de réalisation de la prestation ou de la livraison (si différente de la date de facturation)
Date d'échéance du paiement
---
3. Informations sur le Client (Consommateur particulier)
Nom et Prénom du client particulier
Adresse du domicile du client
> **Note :** Aucun numéro de TVA n'est requis pour le client particulier.
---
4. Détail des Produits / Prestations et Décompte Financier
Description détaillée des biens livrés ou des services fournis
Quantité et Prix unitaire HTVA
Taux de TVA appliqué (ex. 21 %, 12 %, 6 % ou 0 %) ventilé par ligne si plusieurs taux coexistent
Montant total de la TVA due
Montant total à payer TTC (Toutes Taxes Comprises)
---
5. Mentions Spécifiques et Règlements Particuliers (Selon le cas)
A. Rénovation immobilière à 6 % (Logement de plus de 10 ans)
Doit comporter l'attestation légale :
> *"Taux de TVA : En l'absence de contestation par écrit dans un délai d'un mois à compter de la réception de la facture, le client est présumé reconnaître que les travaux sont effectués à un bâtiment d'habitation dont la première occupation date d'au moins 10 ans..."*
B. Régime de franchise des petites entreprises (Exonération TVA)
Si l'entreprise bénéficie du régime de franchise pour le chiffre d'affaires :
> *"Régime particulier de franchise des petites entreprises"*
C. Retard de paiement
Indication claire des conditions applicables en cas de retard de paiement conformément aux règles de protection du consommateur.

## Légal / compliance

 <!-- Explication legales trouvée en documentation -->