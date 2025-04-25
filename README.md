Le test est accessible en visualisation à l'adresse suivante :

http://jam-diffus.jeremy-hennegrave.net:8080/

Le script dans le repertoire "database" permet de structurer la base (attention a bien changé le mot de passe de l'utilisateur)

Ensuite il faut exectuer la commande symfony : `php bin/console doctrine:migrations:migrate`

Le script de peuplement est accessible depuis l'interface web mais il est possible de le lancer par la commande :

`php bin/console jam_diffus:populate_user`

Enfin, je n'ai pas utiliser phpQuery car cela n'était pas nécessaire et complexifié le test.
