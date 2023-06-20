## Mise à jour des dysfonctionnements des balises et du backoffice REG (v1.7.0)

#### Ce qui a changé

* Aperçu de la zone REG à partir de la recherche par @thoomasbro dans https://github.com/MTES-MCT/monitorfish/pull/975
* Correction de la mise à jour de la profondeur de piste par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/996
* Correction du masquage d'une seule zone réglementaire lorsqu'un sujet est affiché par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/993
* Correction de la recherche pour ne pas rechercher dans l'URL et supprimer les échappements par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/995
* Exécutez les flux dans des conteneurs par @VincentAntoine dans https://github.com/MTES-MCT/monitorfish/pull/1006
* Bump follow-redirects de 1.14.7 à 1.14.8 dans /frontend par @dependabot dans https://github.com/MTES-MCT/monitorfish/pull/1007
* Bump postgresql de 42.2.25 à 42.3.3 dans /backend par @dependabot dans https://github.com/MTES-MCT/monitorfish/pull/1010
* Surveiller uniquement les balises des navires français par @VincentAntoine sur https://github.com/MTES-MCT/monitorfish/pull/1009
* Enregistrer la zone réglementaire sélectionnée dans le stockage local par @AudreyBramy dans https://github.com/MTES-MCT/monitorfish/pull/877
* Ajouter les engins manquants dans les règlements par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/1018
* Bump url-parse de 1.5.3 à 1.5.7 dans /frontend par @dependabot dans https://github.com/MTES-MCT/monitorfish/pull/1024
* Ajouter un décorateur transactionnel par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/1025
* Ajouter un avertissement de réglementation obsolète et une propriété allYear en période de pêche par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/1031
* Mise à jour des couches réglementaires sélectionnées par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/990
* Correction de la priorité de contrôle des segments actuels pour 2022 par @VincentAntoine dans https://github.com/MTES-MCT/monitorfish/pull/1037
* Bump url-parse de 1.5.7 à 1.5.10 dans /frontend par @dependabot dans https://github.com/MTES-MCT/monitorfish/pull/1042
* Exécutez l'agent docker préfet en tant que processus local par @VincentAntoine dans https://github.com/MTES-MCT/monitorfish/pull/1048
* Correction de l'emplacement du port des galets par @VincentAntoine dans https://github.com/MTES-MCT/monitorfish/pull/1053
* Améliorations de la recherche réglementaire par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/1044
* Nettoyer les colonnes de réglementation inutilisées et refactoriser les noms de colonne par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/1036
* Backoffice/modifications diverses par @AudreyBramy dans https://github.com/MTES-MCT/monitorfish/pull/1041
* Corrections de l'interface utilisateur REG et balises par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/1063
* Base de données de sauvegarde par @VincentAntoine dans https://github.com/MTES-MCT/monitorfish/pull/1067
* Mise à jour tordue vers 22.2.0 et scrapy vers 2.6.1 par @VincentAntoine dans https://github.com/MTES-MCT/monitorfish/pull/1069
* Mise à jour des catégories d'engrenages par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/1071
* Mise à jour des dysfonctionnements des balises par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/1064
* Ajouter le tri par messages corrigés en premier pour les messages PNO et LAN ERS par @louptheron dans https://github.com/MTES-MCT/monitorfish/pull/1072
* Mise à jour de l'oreiller par @VincentAntoine dans https://github.com/MTES-MCT/monitorfish/pull/1074

** Journal complet des modifications ** : https://github.com/MTES-MCT/monitorfish/compare/v1.6.4...v1.7.0
- Exclure les navires < 12m des dysfonctionnements (V1.7.2)