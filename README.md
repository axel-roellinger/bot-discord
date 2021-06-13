# bot Discord

ce bot est conçu pour émuler une des fonctions principales du bot Rythm, à savoir jouer l'audio d'une vidéo YouTube
dans un canal vocal.

Ce projet m'a permis de découvrir l'API Discord et de me familiariser avec certains concepts de JavaScript.
Egalement, j'ai abordé le sujet de Node.js, qui est requis pour le bon fonctionnement du bot.

Mon code se base principalement sur celui présent sur ces deux sites : 
- Digital ocean : https://www.digitalocean.com/community/tutorials/how-to-build-a-discord-bot-with-node-js-fr
- La documentation de l'API : https://discordjs.guide/

Je n'ai pas pour objectif de faire certifier ce Bot, ni de me prétendre propriétaire de l'intégralité du code.
Ce repositoire est principalement présent pour stocker mon code et sauvegarder mon avancement.

Néanmoins, si mon code peut aider quelqu'un, une personne peut le réutiliser, mais en citant les deux sites Web ci-dessus.

Fonctions du bot opérationnelles (à première vue):
- !join : indique au bot de rejoindre un canal vocal, qui sera celui de l'émetteur de la commande
- !leave : le bot quittera le canal vocal dans lequel il se trouve
- !play-youtube <insérer lien> : si le bot est dans un canal vocal, il jouera l'audio du lien transmis
- playExampleSong : plus technique ; permet au bot de jouer une piste mp3 stockée localement dans le même dossier
    que le bot (plus simple pour la gestion des liens et la lisibilité du code). Cependant, il n'y a pas d'option
    pour choisir la dite musique, elle doit être codée "en dur".

Fonctions occasionnant des bugs :
- !stop : permet de mettre en pause la lecture de la bande audio. L'utiliser plusieurs fois peut causer des erreurs 
    côté serveur
- !resume : permet de reprendre la lecture de la bande audio. Elle peut ne pas fonctionner, faisant que la bande
    audio ne se relancera pas. L'utiliser alors plusieurs fois de suite peut faire reprendre la lecture, mais
    également causer des bugs côté serveur
    
Etant débutant en JS, je ne peux pas encore décoder avec certitude l'intégralité des messages d'erreur de Node.js, 
même si la première ligne du rapport d'erreur qui apparaît dans la console est souvent assez explicite pour cerner
le problème.


Point intéressant : l'utilisation du mot-clé async, pour initier la boucle principale. Voici la manière dont j'en ai compris le fonctionnement.
async est un mot-clé servant à faire de l'asynchronisme. 
Il est dit sur le site https://blog.engineering.publicissapient.fr/2017/11/14/asyncawait-une-meilleure-facon-de-faire-de-lasynchronisme-en-javascript/
que par design, Node.js est asynchrone.
J'ai alors cherché ce qu'est du code asynchrone de manière générale. Je me suis alors tourné vers le site OpenClassrooms,
qui possède un bon cours sur le sujet (https://openclassrooms.com/fr/courses/5543061-ecrivez-du-javascript-pour-le-web/5577651-comprenez-comment-fonctionne-lasynchrone-en-js)
Tout d'abord, on nous annonce que JS est un langage synchrone et mono-thread, signifiant qu'il n'y a qu'un seul fil
d'exécution du code source. Chaque ligne est exécutée l'une après l'autre. Rien d'autre ne peut être exécuté en parallèle.

Cependant, il est malgré tout possible de faire du code asynchrone en JS. Cela signifie que le code, même s'il s'exécute
ligne après ligne, n'attendra pas forcément que la ligne asynchrone ait fini son exécution.

exemple tiré du cours :

let productId = 1;
let productPrice = getProductPriceAsync(productId);
doSomething(productPrice);

En supposant donc que getProductPriceAsync soit asynchrone, la ligne suivante sera exécutée avant la fin de la ligne
précédente, mais la fonction doSomething ne pourra rien faire avant que la fonction asynchrone ne soit totalement
exécutée, car la valeur productPrice ne peut pas encore être utilisée.

En complétant cette information avec ce qui se trouve ici (https://discordjs.guide/additional-info/async-await.html#how-do-promises-work),
on comprend que "async message" signifie que même lorsqu'une tâche s'exécute, et que la boucle d'instructions n'est plus sollicitée (exemple : on lit une vidéo YT),
un utilisateur peut tout de même envoyer un message qui sera interprétée par le serveur et associé à une des actions du bot s'il y a correspondance.


