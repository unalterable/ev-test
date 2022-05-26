import React, { useState, useEffect } from 'react'
import * as R from 'ramda'
import { DateTime } from 'luxon'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Clients } from './schemas'

const State = (props: { children: (args: { state: any, setState: React.Dispatch<any>, reset: () => void }) => JSX.Element, initialState?: any }) => {
  const [state, setState] = useState(props.initialState)
  return <>{props.children({ state, setState, reset: () => setState(props.initialState) })}</>
}

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: '10rem',
  },
  minWidth8rem: {
    minWidth: '8rem',
  },
  paper: {
    padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  wide: {
    minWidth: '30rem',
  },
  labelledField: {
    width: '9rem',
    marginRight: '0.5rem',
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}))

const ClientsPage = (props: { fetchClients: () => Promise<Clients>, createClient: (client: any) => Promise<void> }) => {
  const [clients, setClients] = useState<Clients | undefined>(undefined)
  const classes = useStyles()

  const fetchClients = () => Promise.resolve()
    .then(() => setClients(undefined))
    .then(props.fetchClients)
    .then(setClients)
    .catch(e => alert(`Error: Could not fetch clients ${e.message}`))

  const createClient = (client: any) => Promise.resolve(client)
    .then(props.createClient)
    .then(fetchClients)
    .catch(e => alert(`Error: Client not created ${e.message}`))

  useEffect(() => { fetchClients() }, [])

  return (
    <React.Fragment>
      <Box p="2rem" data-testid="client-create-box">
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar} />
          <Typography component="h1" variant="h5">Create A Client, in devops!</Typography>
          <State initialState={{ name: '', email: '', company: '' }}>
            {({ state: client, setState: setClient, reset }) => (
              <form className={classes.form} onSubmit={e => (e.preventDefault(), createClient(client).then(reset))}>
                <TextField
                  label="Name"
                  value={client.name}
                  className={classes.labelledField}
                  onChange={e => setClient({ ...client, name: e.target.value })}
                  inputProps={{ 'data-testid': "client-create-name-field" }} />
                <TextField
                  label="Email"
                  value={client.email}
                  className={classes.labelledField}
                  onChange={e => setClient({ ...client, email: e.target.value })}
                  inputProps={{ 'data-testid': "client-create-email-field" }} />
                <TextField
                  label="Company"
                  value={client.company}
                  className={classes.labelledField}
                  onChange={e => setClient({ ...client, company: e.target.value })}
                  inputProps={{ 'data-testid': "client-create-company-field" }} />
                <Button type="submit" variant="contained" color="primary" className={classes.submit} data-testid="client-create-button">Submit</Button>
              </form>)}
          </State>
        </Paper>
      </Box>
      <Box p="2rem" data-testid="client-table">
        {clients
          ?
          <State initialState="">
            {({ state: searchTerm, setState: setSearchTerm }) =>
              <Paper className={classes.paper}>
                <TextField
                  label="Search"
                  value={searchTerm}
                  className={classes.labelledField}
                  onChange={e => setSearchTerm(e.target.value)}
                  inputProps={{ 'data-testid': "client-search" }}
                />
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Company</TableCell>
                        <TableCell>CreatedAt</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {R.pipe(
                        R.always(clients),
                        R.filter(R.propSatisfies(R.includes(searchTerm), 'name')),
                        R.sort(R.descend(R.prop('createdAt'))),
                        R.map((client) => (
                          <TableRow key={client._id}>
                            <TableCell component="th" scope="row">{client.name}</TableCell>
                            <TableCell>{client.email}</TableCell>
                            <TableCell>{client.company}</TableCell>
                            <TableCell align="right" className={classes.minWidth8rem}>{DateTime.fromISO(client.createdAt).toFormat('DD/MM HH:mm:ss')}</TableCell>
                          </TableRow>)))()}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>}
          </State>
          :
          <>Loading...</>}
      </Box>
    </React.Fragment>
  )
}

export default ClientsPage
