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
    Pour le mail, nous testons tout d'abord si le mail est un mail valide, ensuite, nous personnalisons une validation dans laquelle nous testons d'abord si le mail de l'utilisateur qui envoi la requête est le différent de celui entré sur le formulaire. Si c'est le cas, c'est que l'utilisateur veut changer son e-mail et donc nous devons vérifier si celui qu'il veut utiliser n'est pas déjà lié à un autre utilisateur. Enfin nous normalisons ce mail

    Pour le mot de passe, nous nous rassurons aussi qu'il doit entrer son ancien mot de passe avant toute modification.

### controllers

- `user.ctrl.js`

  - signup
    Tout d'abord nous récupérons les informations que l'utilisateur enverra dans le corps de la requête mais aussi le chemin du fichier dans la propriété `file` de la requête.

    Ensuite nous testons si ces données sont invalides. Si c'est cas nous renvoyons directement la réponse avec un status `422`.

    Si tout est bon, nous téléchargeons l'image sur cloudinary (Nous verrons les configurations ci-bas) puis nous créons un nouvel utilisateur en nous basant sur notre modèle.
    Après création de l'utilisateur avec un mot de passe hashé d'avance (`const hashedPwd = await bcrypt.hash(password, 10)`), nous l'enregistrons avec la méthode `save()` de mongoose. Nous emettons un événement socket qui se charge de dire aux autres utilisateurs que celui qui vient de s'enregistrer est en ligne : Par la mếme occasion nous assignons donc un token à cet utilisateur, ce qui lui permettra d'être connecté du côté front-end. Dans ce controlleur nous ne vérifions plus si l'e-mail qu'il a choisi existe déjà puis que la validation s'en charge déjà.

  - Login
    Nous récupérons d'abord les informations que l'utilisateur enverra dans le corps de la requête et nous testons leur validité. Puis ensuite, nous cherchons s'il y un utilisateur lié au mail que l'utilisateur nous envoie avec la méthode `findOne()` de mongoose. Si aucun utilisateur n'est trouvé, nous renvoyons une reponse 'Non authorisé'; sinl'utilisateur est trouvé, nous testons maintenant la conformité des mots de passe : celui stocké et celui envoyé par l'utilisateur avec ` const isValidPwd = await bcrypt.compare(password, user.password)`. Si les mots de passe ne correspondent pas, nous renvoyons encore une réponse 'Non authorisé'. Par contre, si tout est bon, nous changeons son statut de connexion et l'enregistrons, puis nous émettons l'événement de connexion et enfin lui assignons un token.

  - Logout
    Ici nous récupérons l'identifiant de l'utilisateur qui envoie la requête, recherchons l'utilisateur portant cet identifiant, changeons son état de connexion s'il est trouvé, puis nous sauvegardons et émettons l'événement de connexion.

  - Edit user
    Ce controlleur permet à un utilisateur de modifier les informations de son profile.
    Dédans, nous récupérons les éléments du corps de la requête mais aussi le fichier de l'image avant de passer à la validation. Le reste des opérqtions consistent en la modification des informations à leur sauvegarde ainsi qu'à l'assignation d'un nouveau token.
