import express from 'express'
import bodyParser from 'express'
import { handleGetTodos } from './handlers/handleGetTodos.js'
import { dbConnect } from './middleware/dbConnect.js'
import { dbDisconnect } from './middleware/dbDisconnect.js'
import { handleUserRequests } from './handlers/handleUserRequests.js'

const app = express()
app.use(bodyParser.urlencoded({extended: false}), bodyParser.json())
app.use(dbConnect)

app.post('/user/*', handleUserRequests)

app.use(dbDisconnect)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
