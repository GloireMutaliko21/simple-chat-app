# TALKS API

Vous lirez ici les informations nécessaires pour comprendre l'utilisation de l'api talks

<br>

## Url de base

`https://talks-rxtu.onrender.com/talks/api/v1`

L'api est faite de deux modèles :

- Les utilisateurs : `users` et
- Les messages: `messages`

> En outre, si vous aimeriez comprendre le code, vous pouvez voir la description du [backend](/backend.md)

## 1. Users

**Url de base :** `/users`

### 1.1. Signup : POST method

> Permet l'enregistrement d'un nouvel utilisateur

**end-point :**

`https://talks-rxtu.onrender.com/talks/api/v1/users/signup`

**request body :**

```
{
   "email": "user@email.com"
   "username": "UserName"
   "password": "userPassword"
   "image": "image.jpg"
}
```

**response :**

```
{
   "message": "Registered",
   "user": {
       "email": "user@email.com",
       "username": "UserName",
       "image": {
           "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1670260912/chatProfiles/cjqsyt32neecgl7r9fqt.jpg"
       },
       "isLogged": true,
       "_id": "638e28b1e9dd2928ed91ff76",
       "__v": 0
   },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzhlMjhiMWU5ZGQyOTI4ZWQ5MWZmNzYiLCJpYXQiOjE2NzAyNjA5MTQsImV4cCI6MTY3MDI4MjUxNH0.nBEibUCYVtRzMksisAg9sUDTCVZso47alqGB1a0sTUg"
}
```

### 1.2. Login : POST method

> Permet la connexion de l'utilisateur

**end-point :**

`https://talks-rxtu.onrender.com/talks/api/v1/users/login`

**request body :**

```
{
   "email": "user@email.com"
   "password": "userPassword"
}
```

**response :**

```
{
   "user": {
       "image": {
           "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1670175633/chatProfiles/bluqnj1dkzqqjipwdieb.jpg"
       },
       "_id": "638cdb911387cdd749444bb7",
       "email": "user@email.com",
       "username": "UserName",
       "isLogged": true,
       "__v": 0
   },
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzhjZGI5MTEzODdjZGQ3NDk0NDRiYjciLCJpYXQiOjE2NzAxNzc1NzgsImV4cCI6MTY3MDE5OTE3OH0.KoRKFAFKosZrwK6goCnUDJ_DksmrXxKRWDryYmPj-Ps"
}
```

### 1.3. Logout : GET method

> Permet deconnexion d'un utilisateur. Ici l'utilisateur doit être authentifié.

**request headers :**

```
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
   }
```

**end-point :**

`https://talks-rxtu.onrender.com/talks/api/v1/users/logout`

**response :**

```
{
   "message": "No content"
}
```

### 1.4. Edit profile : PUT method

> Permet à l'utilisateur de modifier les informations de son profile

**request headers :**

```
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
   }
```

**end-point :**

`https://talks-rxtu.onrender.com/talks/api/v1/users/edit`

**request body :**

```
{
   "email": "user@email.com"
   "username": "UserName"
   "oldPwd": "userOldPassword"
   "password": "userNewPassword"
   "image": "image.jpg"
}
```

**response :**

```
{
   "message": "Registered",
   "user": {
       "email": "user@email.com",
       "username": "UserName",
       "image": {
           "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1670260912/chatProfiles/cjqsyt32neecgl7r9fqt.jpg"
       },
       "isLogged": true,
       "_id": "638e28b1e9dd2928ed91ff76",
       "__v": 0
   },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzhlMjhiMWU5ZGQyOTI4ZWQ5MWZmNzYiLCJpYXQiOjE2NzAyNjA5MTQsImV4cCI6MTY3MDI4MjUxNH0.nBEibUCYVtRzMksisAg9sUDTCVZso47alqGB1a0sTUg"
}
```

## 2. Messages

**Url de base :** `/messages`

**requests headers :** Toutes les requêtes devront avoir ces headers pour l'authentification

```
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
   }
``
```

### 2.1 Send message : POST method

> Permet d'envoyer un message à un autre utilisateur

**end-point :**

`https://talks-rxtu.onrender.com/talks/api/v1/messages/send/:receiverId`

**request params :**

```
   {
      'receiverId': 'idOfReceiver',
   }
```

**request body :**

```
{
   "content": "Hello receiver"
}
```

**response :**

```
{
   "message": {
      "content": "Hello receiver",
       "senderId": "idOfSender",
       "receiverId": "IdOfReceiverId"
       "talkers": ["idOfSender","IdOfReceiverId"]
   }
}
```

### 2.2. Get messages : GET method

> Pour l'utilisateur connecté, cet end-point lui permettra de récupérer les messages envoyés entre lui et l'utilisateur dont l'id est passé en paramètre de la requête

**end-point :**

`https://talks-rxtu.onrender.com/talks/api/v1/messages/messages/:receiverId`

**request params :**

```
   {
      'receiverId': 'idOfReceiver',
   }
```

**response :**

```
{
   "data": [
       {
           "_id": "637f297393d49441e131b035",
           "content": "Bonjour",
           "senderId": {
               "image": "public/images/2022-11-17T14:47:46.922Z-WhatsApp Image 2022-08-19 at 15.22.20.jpeg",
               "isLogged": false,
               "_id": "63764993c8240366ede3b03c",
               "email": "salva@golla.com",
               "username": "GloireSalva",
               "__v": 0
           },
           "receiverId": {
               "image": {
                   "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1669644684/chatProfiles/ybpvihoiasrvaxmyd1wr.jpg"
               },
               "_id": "6372af4b04916ee67f355226",
               "email": "royls@golla.com",
               "username": "Reliff",
               "__v": 0,
               "isLogged": true
           },
           "talkers": [
               "63764993c8240366ede3b03c",
               "6372af4b04916ee67f355226"
           ],
           "createdAt": "2022-11-24T08:21:07.581Z",
           "updatedAt": "2022-11-24T08:21:07.581Z",
           "__v": 0
       },
       {
           "_id": "637f299293d49441e131b0cb",
           "content": "Oui bonjour",
           "senderId": {
               "image": {
                   "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1669644684/chatProfiles/ybpvihoiasrvaxmyd1wr.jpg"
               },
               "_id": "6372af4b04916ee67f355226",
               "email": "royls@golla.com",
               "username": "Reliff",
               "__v": 0,
               "isLogged": true
           },
           "receiverId": {
               "image": "public/images/2022-11-17T14:47:46.922Z-WhatsApp Image 2022-08-19 at 15.22.20.jpeg",
               "isLogged": false,
               "_id": "63764993c8240366ede3b03c",
               "email": "salva@golla.com",
               "username": "GloireSalva",
               "__v": 0
           },
           "talkers": [
               "6372af4b04916ee67f355226",
               "63764993c8240366ede3b03c"
           ],
           "createdAt": "2022-11-24T08:21:38.447Z",
           "updatedAt": "2022-11-24T08:21:38.447Z",
           "__v": 0
       },
       {
           "_id": "637f34da21cfe38568dfbaf1",
           "content": "C'est comment ?",
           "senderId": {
               "image": "public/images/2022-11-17T14:47:46.922Z-WhatsApp Image 2022-08-19 at 15.22.20.jpeg",
               "isLogged": false,
               "_id": "63764993c8240366ede3b03c",
              "email": "salva@golla.com",
              "username": "GloireSalva",
              "__v": 0
           },
           "receiverId": {
               "image": {
                   "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1669644684/chatProfiles/ybpvihoiasrvaxmyd1wr.jpg"
               },
               "_id": "6372af4b04916ee67f355226",
               "email": "royls@golla.com",
               "username": "Reliff",
               "__v": 0,
               "isLogged": true
           },
           "talkers": [
               "63764993c8240366ede3b03c",
               "6372af4b04916ee67f355226"
           ],
           "createdAt": "2022-11-24T09:09:46.984Z",
           "updatedAt": "2022-11-24T09:09:46.984Z",
           "__v": 0
       },
   ]
}
```

### 2.3. Get relatedMessages : GET method

> Pour l'utilisateur connecté, cet end-point lui permettra de récupérer tous utilisateurs avec lesquels il a déjà été en contact en associant le dernier de message de la conversation pour chacun de ces utilisateurs

**end-point :**

`https://talks-rxtu.onrender.com/talks/api/v1/messages/messages`

**response :**

```
{
    "data": {
        "messages": [
            {
                "_id": "6385dce4de9fb8056d04c0f7",
                "content": "Powa za siku ?",
                "senderId": {
                    "image": {
                        "id": "chatProfiles/ybpvihoiasrvaxmyd1wr",
                        "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1669644684/chatProfiles/ybpvihoiasrvaxmyd1wr.jpg"
                    },
                    "_id": "6372af4b04916ee67f355226",
                    "email": "royls@golla.com",
                    "username": "Reliff",
                    "password": "$2b$10$njQrj9iZYxYSQ5AZiY10c.YStBlwKQhAdsJJZWwsDtG0BLtb1YNEy",
                    "__v": 0,
                    "isLogged": true
                },
                "receiverId": {
                    "image": {
                        "id": "chatProfiles/m4cfdpxndtcofev2myhw",
                        "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1669455092/chatProfiles/m4cfdpxndtcofev2myhw.jpg"
                    },
                    "_id": "6381dcf4122305d6673068e3",
                    "email": "eric@golla.com",
                    "username": "Eric",
                    "password": "$2b$10$bspZnfAqHmj1.leERndeq.vk66wzOV6/822vCSaDP/UVnoeqhRaeG",
                    "isLogged": true,
                    "__v": 0
                },
                "talkers": [
                    "6372af4b04916ee67f355226",
                    "6381dcf4122305d6673068e3"
                ],
                "createdAt": "2022-11-29T10:20:20.824Z",
                "updatedAt": "2022-11-29T10:20:20.824Z",
                "__v": 0
            },
            {
                "_id": "6385c6663bde2cccbf279ced",
                "content": "Salut pour Obed",
                "senderId": {
                    "image": {
                        "id": "chatProfiles/ybpvihoiasrvaxmyd1wr",
                        "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1669644684/chatProfiles/ybpvihoiasrvaxmyd1wr.jpg"
                    },
                    "_id": "6372af4b04916ee67f355226",
                    "email": "royls@golla.com",
                    "username": "Reliff",
                    "password": "$2b$10$njQrj9iZYxYSQ5AZiY10c.YStBlwKQhAdsJJZWwsDtG0BLtb1YNEy",
                    "__v": 0,
                    "isLogged": true
                },
                "receiverId": {
                    "image": "public/images/2022-11-17T14:47:46.922Z-WhatsApp Image 2022-08-19 at 15.22.20.jpeg",
                    "isLogged": false,
                    "_id": "63764993c8240366ede3b03c",
                    "email": "salva@golla.com",
                    "username": "GloireSalva",
                    "password": "$2b$10$pZwypax2cpLDxWw8ps./.eX31YfA89KUR1rVGKswbzYPE7APMLp32",
                    "__v": 0
                },
                "talkers": [
                    "6372af4b04916ee67f355226",
                    "63764993c8240366ede3b03c"
                ],
                "createdAt": "2022-11-29T08:44:22.242Z",
                "updatedAt": "2022-11-29T08:44:22.242Z",
                "__v": 0
            },
            {
                "_id": "63847325615e93b278d01adc",
                "content": "jfjjf",
                "senderId": {
                    "image": {
                        "id": "chatProfiles/ybpvihoiasrvaxmyd1wr",
                        "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1669644684/chatProfiles/ybpvihoiasrvaxmyd1wr.jpg"
                    },
                    "_id": "6372af4b04916ee67f355226",
                    "email": "royls@golla.com",
                    "username": "Reliff",
                    "password": "$2b$10$njQrj9iZYxYSQ5AZiY10c.YStBlwKQhAdsJJZWwsDtG0BLtb1YNEy",
                    "__v": 0,
                    "isLogged": true
                },
                "receiverId": {
                    "isLogged": false,
                    "_id": "6372b4ac6818b9bd35d12779",
                    "email": "charlene@golla.com",
                    "username": "Charlene NM",
                    "password": "$2b$10$qlHWvSbpFubdwSXf7FCJbOXyiNzHNQAPU3EQXyjYmgC3oOE9Ybzq.",
                    "__v": 0
                },
                "talkers": [
                    "6372af4b04916ee67f355226",
                    "6372b4ac6818b9bd35d12779"
                ],
                "createdAt": "2022-11-28T08:36:53.082Z",
                "updatedAt": "2022-11-28T08:36:53.082Z",
                "__v": 0
            },
            {
                "_id": "6381d72c122305d66730671f",
                "content": "Salut",
                "senderId": {
                    "image": {
                        "id": "chatProfiles/ybpvihoiasrvaxmyd1wr",
                        "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1669644684/chatProfiles/ybpvihoiasrvaxmyd1wr.jpg"
                    },
                    "_id": "6372af4b04916ee67f355226",
                    "email": "royls@golla.com",
                    "username": "Reliff",
                    "password": "$2b$10$njQrj9iZYxYSQ5AZiY10c.YStBlwKQhAdsJJZWwsDtG0BLtb1YNEy",
                    "__v": 0,
                    "isLogged": true
                },
                "receiverId": {
                    "image": {
                        "id": "chatProfiles/rjfbkyygjvbey9bqafjb",
                        "url": "https://res.cloudinary.com/denyh7jft/image/upload/v1668781030/chatProfiles/rjfbkyygjvbey9bqafjb.jpg"
                    },
                    "_id": "6372a925705e79df5c4f9158",
                    "email": "val@golla.com",
                    "username": "ItVal",
                    "password": "$2b$10$b..HvynNmbM96EPMnPUj1eXC3NccKZCLPr7CHeQ/UByrGDXb0k8Qu",
                    "__v": 0,
                    "isLogged": false
                },
                "talkers": [
                    "6372af4b04916ee67f355226",
                    "6372a925705e79df5c4f9158"
                ],
                "createdAt": "2022-11-26T09:06:52.154Z",
                "updatedAt": "2022-11-26T09:06:52.154Z",
                "__v": 0
            }
        ]
    }
}
```

## Thanks for reading
