import React from "react"
import axios from 'axios'
import * as R from 'ramda'
import { parseAsClients } from "./schemas"
import ClientPage from './ClientPage'

console.log('Hello Devops at EV')
const App = () => {
  return (
    <ClientPage
      fetchClients={() => axios.get('/api/clients/all')
        .then(R.prop('data'))
        .then(parseAsClients)}
      createClient={(client: any) => axios.post('/api/clients/create', client)}
    />
  );
};

export default App;

