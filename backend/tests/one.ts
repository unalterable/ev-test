import 'mocha'
import { expect } from 'chai'
import axios, { AxiosResponse } from 'axios'

describe('"/api/clients" Endpoints', () => {
  let allClientsFirstResponse: AxiosResponse
  let createClientResponse: AxiosResponse
  let allClientsSecondResponse: AxiosResponse

  before(async () => {
    allClientsFirstResponse = await axios.get('http://localhost:3001/api/clients/all', {validateStatus: null})
    createClientResponse = await axios.post('http://localhost:3001/api/client/create', {
      
    }, {validateStatus: null})
    allClientsSecondResponse = await axios.get('http://localhost:3001/api/clients/all', {validateStatus: null})
  })

  xit('GET "/api/clients/all" should return an array with all clients', () => {
    expect(allClientsFirstResponse.data).to.eql([])
    expect(allClientsSecondResponse.data).to.deep.equal(allClientsFirstResponse.data.concat({}))
  })
  xit('POST "/api/clients/create" should create a client', () => {
    expect(createClientResponse).to.be.false
  })
  xit('GET "/api/clients/all" should return an array with new item', () => {
  })
})