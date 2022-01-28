import { MongoClient } from 'mongodb'

const mongoDriver = (mongoUrl: string) => {
  let connectionAttempt: Promise<MongoClient> | null

  const resetConnectionAttempt = () => { connectionAttempt = null }
  const getConnection = () => {
    if (!connectionAttempt) {
      connectionAttempt = MongoClient.connect(mongoUrl, {})
        .then(conn => conn.on('close', resetConnectionAttempt))
        .catch(err => {
          resetConnectionAttempt()
          throw Error(`Mongo ==> connection failed: ${err.message}`)
        })
    }
    return connectionAttempt
  }

  return {
    getCollection: (name: string) => getConnection().then(conn => conn.db().collection(name)),
  }
}

export default mongoDriver
