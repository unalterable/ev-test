import initDatabase from '../database/initDatabase'
import { z, ZodError } from 'zod'

const parseAsNewClient = (payload: any) => z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
}).parseAsync(payload)
  .catch((err: ZodError) => Promise.reject({ status: 400 }))

const initDomain = async () => {
  const database = await initDatabase()

  return {
    getAllClients: database.getAllClients,
    createNewClient: (payload: any) => Promise.resolve(payload)
      .then(parseAsNewClient)
      .then(database.addNewClient)
  }
}

export default initDomain
