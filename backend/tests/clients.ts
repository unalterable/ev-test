import 'mocha'
import { expect } from 'chai'
import axios, { AxiosResponse } from 'axios'

describe('"/api/clients" Endpoints', () => {
  let allClientsFirstResponse: AxiosResponse
  let createClientResponse: AxiosResponse
  let createBadClientResponse: AxiosResponse
  let allClientsSecondResponse: AxiosResponse

  const BAD_CLIENT_PAYLOAD = {
    bad_name_key: "A Client Name",
    email: "BAD EMAIL",
    bad_company_key: "Some Company",
  }
  
  const CLIENT_PAYLOAD = {
    name: "A Client Name",
    email: "some@email.com",
    company: "Some Company",
  }

  before(async () => {
    allClientsFirstResponse = await axios.get('http://localhost:3001/api/clients/all', { validateStatus: null })
    createClientResponse = await axios.post('http://localhost:3001/api/clients/create', CLIENT_PAYLOAD, { validateStatus: null })
    createBadClientResponse = await axios.post('http://localhost:3001/api/clients/create', BAD_CLIENT_PAYLOAD, { validateStatus: null })
    allClientsSecondResponse = await axios.get('http://localhost:3001/api/clients/all', { validateStatus: null })
  })

  it('GET "/api/clients/all" should return an array with all clients (one more than we started with)', () => {
    expect(allClientsFirstResponse.status).to.equal(200)
    expect(allClientsSecondResponse.data).to.be.an('array')
    expect(allClientsSecondResponse.status).to.equal(200)
    expect(allClientsFirstResponse.data).to.be.an('array')
    expect(allClientsSecondResponse.data).to.have.length(allClientsFirstResponse.data.length + 1)
  })

  it('POST "/api/clients/create" should create a client, adding "createdAt" ', () => {
    expect(createClientResponse.status).to.equal(201)

    const lastEntry = allClientsSecondResponse.data[allClientsSecondResponse.data.length - 1]
    expect(lastEntry).to.have.property('name').that.equals(CLIENT_PAYLOAD.name)
    expect(lastEntry).to.have.property('email').that.equals(CLIENT_PAYLOAD.email)
    expect(lastEntry).to.have.property('company').that.equals(CLIENT_PAYLOAD.company)
    expect(lastEntry).to.have.property('createdAt')
    expect(new Date(lastEntry.createdAt)).to.be.greaterThan(new Date(Date.now() - 1000))
  })

  it('POST "/api/clients/create" should send 400 on a bad client payload', () => {
    expect(createBadClientResponse.status).to.equal(400)
  })

  it('POST "/api/clients/create" should not save a bad client payload', () => {
    const allClientEmails = allClientsSecondResponse.data.map((c: { email: string }) => c.email)
    expect(allClientEmails).to.not.include(BAD_CLIENT_PAYLOAD.email)
  })
})