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
  la propriété `talkers` est un tableau qui stockera deux identifiants : celui de l'envoyeur et celui du recepteur du message. Ceci nous simplifiera la tâche quand il faudra récupérer les messages entre deux utilisateurs portants ces deux identifiants
