import { MongoClient } from 'mongodb'

const mongoDriver = (mongoUrl: string) => {
  const state: { connectionAttempt: Promise<MongoClient> | null } = { connectionAttempt: null }

  const resetConnectionAttempt = () => { state.connectionAttempt = null }
  const getConnection = () => {
    if (!state.connectionAttempt) state.connectionAttempt = MongoClient.connect(mongoUrl, {})
      .then(conn => conn.on('close', resetConnectionAttempt))
      .catch(err => {
        resetConnectionAttempt()
        throw Error(`Mongo ==> connection failed: ${err.message}`)
      })
    return state.connectionAttempt
  }

  return {
    getCollection: (name: string) => getConnection().then(conn => conn.db().collection(name)),
  }
}

export default mongoDriver
