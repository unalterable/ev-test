import initDatabase from '../database/initDatabase'

const initDomain = async () => {
  const database = await initDatabase()

  return {
    getAllClients: database.getAllClients,
  }
}

export default initDomain
