/* eslint-disable consistent-return */
const admin = require('firebase-admin')
const path = require('path')
const { ErrorObject, undefinedValidator } = require('./functions')

const credentialsRoute = path.join(__dirname, '../../credentials.json')

admin.initializeApp(credentialsRoute)
const db = admin.firestore()

exports.createCollection = async (collectionName) => {
  if (undefinedValidator('collectionName', collectionName)) await db.collection(collectionName).doc(collectionName).set({ create: 'ok' })
  return `Collection ${collectionName} created successfully`
}

exports.createDocument = async (collectionName, documentId, object) => {
  if (
    undefinedValidator('collectionName', collectionName)
    && undefinedValidator('documentId', documentId)
    && undefinedValidator('object', object)
  ) {
    const response = await db.collection(collectionName).doc(documentId).set(object)
    return response
  }
}

exports.findAllDocuments = async (collectionName) => {
  if (undefinedValidator('collectionName', collectionName)) {
    const response = await db.collection(collectionName).get()
    const documents = []
    response.forEach((doc) => {
      documents(doc)
    })
    return documents
  }
}

exports.collectionLength = async (collectionName) => {
  if (undefinedValidator('collectionName', collectionName)) {
    const response = await db.collection(collectionName).get()
    if (response.size !== undefined) {
      return response.size
    }
    throw new ErrorObject(`The collection ${collectionName} doesn't exist`, 400)
  }
}

exports.getByPosition = async (collectionName, position) => {
  if (
    undefinedValidator('collectionName', collectionName)
    && undefinedValidator('position', position)
  ) {
    let documment
    const response = await db.collection(collectionName).limit(position).get()
    response.forEach((doc) => {
      documment = {
        doc,
      }
    })
    return documment
  }
}

exports.findAllCollections = async () => {
  const results = []
  await db.listCollections().then((snapshot) => {
    snapshot.forEach((snaps) => {
      results.push(snaps._queryOptions.collectionId)
    })
  })
  return results
}
