import initMongoDriver from './mongo-driver'

const initDb = async () => {
  const { getCollection } = await initMongoDriver('mongodb://mongo:27017')

  return {
    getAllClients: () => getCollection('clients')
      .then(clientsCollection => clientsCollection.find({}).toArray()),
    addNewClient: (newClient: any) => getCollection('clients')
      .then(clientsCollection => clientsCollection.insertOne({ ...newClient, createdAt: new Date() }))
  }
}

export default initDb
