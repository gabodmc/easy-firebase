# 👽 Easy Firebase Functions

If you have no idea how to operate with firebase, or you don't wanna waste time writting basic operations in your project, this is your ideal package!

## 💾 Requirements

- Firebase credentials
- Node 16 or higher

## Install

```bash
npm i firebase-easy-functions
```

## First of all:

Create a "credentials.json" file in the root of the project and fill with your firebase credentials"
Example:

```json
{
  "apiKey": "",
  "authDomain": "",
  "projectId": "",
  "storageBucket": "",
  "messagingSenderId": "",
  "appId": ""
}
```

![Captura desde 2022-11-27 18-49-25](https://user-images.githubusercontent.com/79473217/204161589-4e41be22-272d-475b-9a4e-ecbef173fe15.png)

## ⌨ Imports

Single imports

```javascript
const { createCollection } = require('firebase-easy-functions')
```

Or multiple imports

```javascript
const { createCollection, deleteCollection } = require('firebase-easy-functions')
```

Or ES6

```javascript
import { createCollection } from 'firebase-easy-functions'
import { createCollection, deleteCollection } from 'firebase-easy-functions'
```

## 📀 Functions

```bash
createCollection(collectionName)
```

collectionName will be the name of the new Collection. The function will return successfull message.

```bash
deleteCollection(collectionName)
```

collectionName will be the name of the new Collection.
The function will delete all the data in the collection and return true (bool)

```bash
createDocument(collectionName, documentId, object)
```

collectionName will be the name of the new Collection. documentId will be the "id" of your documment. object (optional) will be the data of your documment.
The function will return the create firestore payload (\_writtedocument, etc).

```bash
deleteDocument(collectionName, documentId)
```

collectionName will be the name of the new Collection. documentId will be the "id" of your documment.
The function will return the delete firestore payload (\_writtedocument, etc).

```bash
findAllDocuments(collectionName)
```

collectionName will be the name of the new Collection.
The function will return all the documents in the collection.

```bash
collectionLength(collectionName)
```

collectionName will be the name of the new Collection.
The function will return the length (in numbers) of the collection

```bash
getByPosition(collectionName, position)
```

collectionName will be the name of the new Collection, and position will be the specific position of a document you want
The function will return the data that document.

```bash
findAllCollections()
```

The function will return a list of all the collections in your db
