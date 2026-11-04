# Base de Test

<!-- draft -->
<!-- faut encore relire et corriger / reecrire proprement tout ca :d -->

 ## Spécifications et règles métier
 ### TVA

 La TVA est une taxe utilisée dans de nombreux pays mais pas tous. Les règles à respecter pour le calcul de TVA peut varier entre les pays.

 Dans le cas de la Belgique, le calcul était assez souple entre calculé la TVA par lignes ou sur le total. Depuis le passage de la norme européenne EN 16931, il y a l'obligation de calculer la TVA uniquement sur le total.

 Avec les différents taux de TVA en application, il faut grouper chaque total par taux de TVA (dans le cas de la Belgique : 6, 12 ou 21%).

Norme en EU : Directive TVA 2006/112/CE
https://eur-lex.europa.eu/eli/dir/2006/112/oj?locale=fr

Aux USA ils ont plutot la Sale tax
https://www.fonoa.com/resources/blog/the-american-exception-why-the-us-has-no-vat-system

https://en.wikipedia.org/wiki/Value-added_tax#/media/File:Countries_with_VAT.svg

### Arrondis

La méthode pour arrondir les prix qui semble être la norme est l'arrondi mathématique (0,5 monte donc à 1).
Un autre type d'arrondi existe en Belgique pour les paiements en espèces qui consiste à arrondir vers la valeurs de 5 la plus proche (en fonction du chiffre qui précède). Ce type d'arrondi peut être utilisé pour des arrondis de facture numérique mais n'est absolument pas une obligation.
L'arrondi bancaire ne semble pas être considéré pour de simple facture et reste dans le domaine des banque.

### Devises

Le commerce dans les différents pays et continents nécéssite de suivre des règles et d'utiliser possiblement des devises différentes. 
Pour être utilisable en production, l'application doit pouvoir soit cibler une zone spécifique avec une reglementation commune, soit permettre une certaines souplesse, en permettant de :
- configurer les devises
- configurer les taux de change
- choisir les types de taxations appliqué (la TVA n'est pas en application dans une poignée de zone dont les USA notamment)
- différencier les USD, AUD et CAD

### Obligations légales

La Belgique et l'UE précisent les différentes règles et les cas d'applications pour qu'une facture soit légitime. Une facture doit inclure des informations essentielles (selon son format) et être figée, identifiables et unqiues.
Cela signifie que le document doit notamment reprendre :

- Le type de structure du vendeur, sa forme juridique
- Le numéro de TVA du vendeur
- Le numéro de TVA du client dans le cadre du B2B
- L'adresse du client (sauf dans le cadre d'une facture simplifiée). Cela reste utile et pragmatique dans ce cadre, afin de pouvoir livrer le produit au client
- Un facture doit être conservée jusqu'à 10 ans

L'Union Européenne impose pour les factures électroniques B2B de respecter la norme européenne EN 16931.
La Belgique quant à elle impose, depuis peu, l'utilisation de Peppol pour les factures électroniques B2B ou B2G. Je ne l'ai pas considéré dans le cadre de cette campagne de test car l'application Invoicika a été réalisée avant l'introduction de cette loi. Si une mise à jour devait être faite, il faudra surement prendre en compte cette nouvelle contrainte.

<!-- draft -->
Dans le cadre du B2C, le format d'une facture électronique conserve plus de souplesse. 


https://www.myfid.be/ressources/comptabilite/factures-tva/#les-mentions-obligatoires-a-faire-figurer-sur-une-facture-tva

https://synobat.com/be-fr/blog/les-mentions-obligatoires-d-une-facture-en-belgique-le-guide-de-la-facture-conforme

https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/pages/467108874/eInvoicing+Country+Factsheets+for+each+Member+State+and+other+countries

https://www.mediaatelier.com/fr-BE/Posts/EInvoicing-EU/

https://info.hub.brussels/guide/assurances-fiscalite-comptabilite/facturation-electronique-bruxelles

Informations minimales requises sur une facture :
https://sayli.be/blog/fr/tva/mentions-obligatoires-facture-belgique
https://efacture.belgium.be/fr/FAQ/questions-specifiques-sur-la-facturation-electronique#minimaal