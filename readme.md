# SIMPLE CHAT APP : MERN

### Par GloireMutaliko21

## BACKEND

Vous lirez ici les informations nécessaires pour l'utilisation de l'API implémentée pour cette fin

<br>

## Dépendances

- bcrypt : hashage du mot de passe
- cloudinary : stockage des images sur le cloud
- dotenv : configuration des variables d'environnement
- express : framework de l'application
- express-validator : validation des données envoyées depuis le front-end côté serveur
- jsonwebtoken : authentification par token
- mongoose : ODM pour l'interaction avec la base de données Mongo
- mongoose-unique-validator: validation côté de données
- multer : upload des fichiers
- socket.io : temps réel

## Folders

### config

- `db.config.js` :
  Dans ce fichier nous exportons la constante `db` qui nous crée une connexion à l'url de notre base de données. Elle est utilisée directement dans le fichier `app.js`. Ce qui veut dire que dès le lancement de notre application nous aurons une connexion.

### constants

- `constants.js`
  Ici nous stockons nos constantes globales. Il s'agit principalement des URLs de base pour nos routes.

### models

- `user.mdl.js`
  Il s'agit du modèle de l'utilisateur qui constituera notre collection.
  Nous notons ici que la propriété `email` est soumise à la validation côté BD parce que sa valeur doit être unique

- `message.mdl.js`
  C'est le modèle pour nos messages.
  Les champs - `senderId` et `receiverId` font directement référence au modèle `user` et ils stockeront des données de type `ObjectId` de MongoDb; ce qui nous permettra d'appliquer les relations mais aussi de pouvoir accéder à toutes les informations liées à ces `ids` (toutes les propriétés d'un user) avec la méthode `populate` de `mongoose`.
  la propriété `talkers` est un tableau qui stockera deux identifiants : celui de l'envoyeur et celui du recepteur du message. Ceci nous simplifiera la tâche quand il faudra récupérer les messages entre deux utilisateurs portants ces deux identifiants.

### middlewares

- `auth.mid.js`
  C'est le middleware qui nous permet d'authentifier les utilisateurs et protéger certaines routes sensibles de notre application.
  Dans la fonction d'authetintification, nous recupérons le premier paramètre qui viendra des entêtes de la requête dans la partie `authorization` : il s'agit du token ou jeton. Ensuite à l'aide du paquêt `jsonwebtoken` nous allons vérifier puis decoder ce token pour pouvoir en extraire l'identifiant de l'utilisateur. Ce token est codé lors de l'action de login que nous verrons plus tard. Après décodage, nous récupérons l'identifiant de l'utilisateur puis nous recherchons celui-ci dans notre BD et plaçons toutes ses informations dans la requête et nous passons au middleware suivant avec la fonction `next()`.
  Cette fonction est utilisée dans nos routes nécessitant une protection juste avant d'exécuter le controlleur qui est censé réalisé l'action associée à la route. Ce qui veut dire que si le token est invalide ou s'il n'existe pas, notre route ne passera pas à la fonction controlleur mais renverra plutôt un status `401` qui indique la non authorisation.

- `validators.mid.js`
  Dans ce fichier nous exportons la fonction `validators` qui prend en paramètre :

  - `field` : c'est le champs à valider
  - `message` : c'est le message quand la validation n'a pas réussi
  - `action` : c'est l'opération qui est à la base de la validation

  - Validation Login
    Pour le mail, nous testons si le mail entré est un mail valide puis nous le normalisons

    Pour le password nous supprimons juste des espaces à gauche et à droite car c'est de la même manière que nous faisons lors de l'action `signup`

  - Validation Signup
    Pour le mail, nous faisons la même chose que sur l'action du login en ajoutant une validation customisée dans la quelle nous testons si le mail choisi n'est pas déjà utilisé par un autre utilisateur.

    Pour le password nous exigeons qu'il soit de longueur minimal de 6 caractères et supprimons des espaces à gauche et à droite.

    Pour le username nous exigeons qu'il soit un String de longueur minimale de 4 caractères en supprimant d'abord les espaces de gauche et de droite.

  - Validation Envoi du message
    Ici nous exigeons que la longueur du message soit d'au moins 1 caractère sans compter les espaces de gauche et de droite

  - Validation modification Profile
    Pour le mail, nous testons tout d'abord si le mail est un mail valide, ensuite, nous personnalisons une validation dans laquelle nous testons d'abord si le mail de l'utilisateur qui envoi la requête est le différent de celui entré sur le formulaire. Si c'est le cas, c'est que l'utilisateur veut changer son e-mail et donc nous devons vérifier si celui qu'il veut utiliser n'est pas déjà lié à un autre utilisateur.

    Pour le mot de passe, nous nous rassurons aussi qu'il doit entrer son ancien mot de passe avant toute modification.
