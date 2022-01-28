import 'mocha'
import React from 'react'
import { expect } from 'chai'
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react'
import ClientPage from '../src/ClientPage'

const fakeClients = [
  {
    _id: '324324',
    name: 'Name 1',
    email: 'email1@example.com',
    company: 'Company 1',
    createdAt: '2022-01-28T13:39:33.299Z',
  },

  {
    _id: '12324',
    name: 'Name 2',
    email: 'email2@example.com',
    company: 'Company 2',
    createdAt: '2022-01-27T13:39:33.299Z',
  },
]

describe('Client Component', () => {
  it('should render "Loading..." while loading', async () => {
    render(<ClientPage
      fetchClients={() => new Promise(() => { })}
      createClient={() => Promise.resolve()} />)

    expect(screen.getByTestId('client-table').textContent).to.contain('Loading...')
  })

  it('should render all clients', async () => {
    render(<ClientPage
      fetchClients={() => Promise.resolve(fakeClients)}
      createClient={() => Promise.resolve()} />)

    await waitFor(() => expect(screen.getByTestId('client-table').textContent).to.not.contain('Loading...'))

    expect(screen.getByTestId('client-table').textContent).to.contain('Name 1')
    expect(screen.getByTestId('client-table').textContent).to.contain('Name 2')
  })

  it('should search clients correctly', async () => {
    render(<ClientPage
      fetchClients={() => Promise.resolve(fakeClients)}
      createClient={() => Promise.resolve()} />)

    await waitFor(() => expect(screen.getByTestId('client-table').textContent).to.not.contain('Loading...'))
    expect(screen.getByTestId('client-table').textContent).to.contain('Name 2')

    fireEvent.change(screen.getByTestId('client-search'), { target: { value: 'Name 1' } })

    expect(screen.getByTestId('client-table').textContent).to.contain('Name 1')
    expect(screen.getByTestId('client-table').textContent).to.not.contain('Name 2')
  })

  it('should render all inputs needed for new client creation', () => {
    render(<ClientPage
      fetchClients={() => new Promise(() => { })}
      createClient={() => Promise.resolve()} />)

    expect(() => screen.getByTestId('client-create-name-field')).not.throw()
    expect(() => screen.getByTestId('client-create-email-field')).not.throw()
    expect(() => screen.getByTestId('client-create-company-field')).not.throw()
  })

  it('should call back to createClient prop when button is hit', async () => {
    let someState = null // lazy mock

    render(<ClientPage
      fetchClients={() => new Promise(() => { })}
      createClient={val => (someState = val, Promise.resolve())} />)

    fireEvent.change(screen.getByTestId('client-create-name-field'), { target: { value: 'Name 3' } })
    fireEvent.change(screen.getByTestId('client-create-email-field'), { target: { value: 'email3@example.com' } })
    fireEvent.change(screen.getByTestId('client-create-company-field'), { target: { value: 'Company 3' } })

    expect(someState).to.equal(null)

    fireEvent.click(screen.getByTestId('client-create-button'))
    await waitFor(() => {})// wait for the event loop to tick

    expect(someState).to.deep.equal(
      {
        name: 'Name 3',
        email: 'email3@example.com',
        company: 'Company 3',
      },
    )
  })
})