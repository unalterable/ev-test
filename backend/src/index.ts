import express from 'express'
import initDomain from './domain/initDomain'

const app = express()

const runApp = async () => {
  const domain = await initDomain()


  app.get('/', (req, res) => res.send('hello'))

  app.get('/api', (req, res) => domain.getAllClients().then(allClients => res.send(allClients)))
  app.get('/api', (req, res) => domain.getAllClients().then(allClients => res.send(allClients)))

  app.listen(3001, () => {
    console.log("Server started on port 3001");
  })
}

runApp()