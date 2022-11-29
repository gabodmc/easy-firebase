/* eslint-disable consistent-return */
const admin = require('firebase-admin')
const path = require('path')
const { ErrorObject, undefinedValidator } = require('./helpers')

// eslint-disable-next-line import/no-dynamic-require
const credentialsRoute = require(`${path.join(__dirname, '../../credentials.json')}`)

admin.initializeApp(credentialsRoute)
const db = admin.firestore()

exports.createCollection = async (collectionName) => {
  if (undefinedValidator('collectionName', collectionName)) await db.collection(collectionName).doc(collectionName).set({ create: 'ok' })
  return `Collection ${collectionName} created successfully`
}

exports.createDocument = async (collectionName: string, documentId: string, object = '') => {
  if (
    undefinedValidator('collectionName', collectionName)
    && undefinedValidator('documentId', documentId)
  ) {
    const response = await db.collection(collectionName).doc(documentId).set(object)
    return response
  }
}

exports.deleteDocument = async (collectionName, documentId) => {
  if (
    undefinedValidator('collectionName', collectionName)
    && undefinedValidator('documentId', documentId)
  ) {
    const response = await db.collection(collectionName).doc(documentId).delete()
    return response
  }
}

exports.findAllDocuments = async (collectionName) => {
  if (undefinedValidator('collectionName', collectionName)) {
    const response = await db.collection(collectionName).get()
    const documents: string[] = []
    response.forEach((doc: any) => {
      documents.push(doc)
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
  const results: string[] = []
  await db.listCollections().then((snapshot) => {
    snapshot.forEach((snaps: any) => {
      results.push(snaps._queryOptions.collectionId)
    })
  })
  return results
}

exports.deleteCollection = async (collectionName) => {
  if (undefinedValidator('collectionName', collectionName)) {
    const batchSize = await this.firebaseGetCollectionLength(collectionName)
    const deletePromise = db
      .collection(collectionName)
      .listDocuments()
      .then((docs) => {
        const batch = db.batch()

        if (docs.length <= batchSize) {
          docs.forEach((doc) => {
            batch.delete(doc)
          })
          batch.commit()
          return true
        }
        for (let i = 0; i < batchSize; i++) {
          batch.delete(docs[i])
        }
        batch.commit()
        return false
      })
      .then((batchStatus: any) => (batchStatus ? true : this.deleteCollection(batchSize)))
      .catch((error: any) => {
        throw new ErrorObject('Error clearing collection', 500, error)
      })

    return deletePromise
  }
}

exports.findById = async (collectionName, documentId) => {
  if (
    undefinedValidator('collectionName', collectionName)
    && undefinedValidator('documentId', documentId)
  ) {
    const response = await db.collection(collectionName).doc(documentId).get()
    if (response._fieldsProto) {
      return response._fieldsProto
    }
    throw new ErrorObject('Not found', 404)
  }
}
