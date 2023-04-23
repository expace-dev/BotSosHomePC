# BotSosHomePC

Version: 1.0.0

Notre bot multi fonction vous être proposé gracieusement.
Il est actuellement fonctionnel mais seras évolué régulièrement.

Vous pouvez rejoindre notre discord support via ce lien:
[https://discord.gg/GZ338BUZeH](https://discord.gg/GZ338BUZeH).

## Installation

Etape 1: Cloner le dépot Git

```
git clone https://github.com/expace-dev/BotSosHomePC.git
```

Etape 2: Créer le fichier de variable

```diff
// .env

+ ## CONFIG DU BOT ##
+ DISCORD_TOKEN=
+ DATABASE_URI=
+ GUILD_ID=

+ ## ID DES SALONS ##
// Ces deux salons servent à envoyer les messages d'arrivées et de départs
+ ARRIVED_CHANNEL=1092483935499452456
+ QUIT_CHANNEL=1092484137245474948
// Celui ci est utilisé pour le salon règlement
+ RULE_CHANNEL=1092485663619821658
// Celui-ci pour les logs d'arrivée 
+ MODO_ARRIVED_CHANNEL=1097418473472270447
// Les logs de départ
+ MODO_QUIT_CHANNEL=1097448312178745374
// Les logs modérateur
+ MODO_LOGS_CHANNEL=1097759290732838922

+ ## COULEUR DES EMDEDS ##
+ COLOR_PRIMARY=e71a33
+ COLOR_SUCCESS=21ff81
+ COLOR_DANGER=dc143c

+ ## ID DES ROLES ##

// Information sur la DB (utilise Mysql)
+ ## DATABASE ##
+ HOST=
+ USER=
+ PASSWORD=
+ DATABASE=

```

Etape 3: Installation

```
npm install
```

Etape 4: Lancement du bot

```
node .
```

Certaines commandes et évènements nécéssitent des variables bien renseigné dans le fichier de l'étape 2

En cas de problème vous pouvez demander de l'aide sur notre [Discord](https://discord.gg/GZ338BUZeH).