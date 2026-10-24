# Base de Test

<!-- draft -->
<!-- faut entrer la documentation ici
+ "specification, exigences, user stories"
 -->

Contradiction de l'app : 
TVA -> tres EU et national en Europe

Aux USA ils ont plutot la Sale tax -> source
https://www.fonoa.com/resources/blog/the-american-exception-why-the-us-has-no-vat-system

Pas de changement de currency bloqué en $ ?! Absurde pour du national, EU, etc hors USA donc partout dans le monde

Manque d'infos clé comme le type de structure du vendeur (Forme juridique et RPM / registre du commerce), son num de TVA
Impossible de factuer en B2B car pas de num de TVA pour l'acheteur

Sur facture complete -> adresse client obligatoire, sur simplifiée non
Possiblement, on peut pas livrer le produit sans adresse (by the way, pour le pratico pratique)


https://www.myfid.be/ressources/comptabilite/factures-tva/#les-mentions-obligatoires-a-faire-figurer-sur-une-facture-tva

https://synobat.com/be-fr/blog/les-mentions-obligatoires-d-une-facture-en-belgique-le-guide-de-la-facture-conforme

https://ec.europa.eu/digital-building-blocks/sites/spaces/DIGITAL/pages/467108874/eInvoicing+Country+Factsheets+for+each+Member+State+and+other+countries

https://www.mediaatelier.com/fr-BE/Posts/EInvoicing-EU/

https://info.hub.brussels/guide/assurances-fiscalite-comptabilite/facturation-electronique-bruxelles

USA : 
https://www.pramex.com/implantation-etats-unis/comment-fonctionne-la-tva-aux-usa/

Une facture doit etre conservée 10 ans!

Facture B2B -> Obligation de Peppol en Belgique, devient de plus en plus obligatoire dans d'autres pays Européens
B2G -> Peppol en BE

B2C -> format custom encore possible

La norme européenne EN 16931 ne concerne pas le B2C

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