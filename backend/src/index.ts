import express from 'express'
import 'express-async-errors'
import initDomain from './domain/initDomain'

const runApp = async () => {
  const domain = await initDomain()

  const app = express()

  app.use(express.json())
  app.get('/api/clients/all', (req, res) => domain.getAllClients().then(allClients => res.send(allClients)))
  app.post('/api/clients/create', async(req, res) =>  domain.createNewClient(req.body).then(() => res.sendStatus(201)))

  app.listen(3001, () => {
    console.log("Server started on port 3001");
  })
}

runApp()