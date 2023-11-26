import express from 'express'
import { dbConnect } from './middleware/dbConnect.js'
import { dbDisconnect } from './middleware/dbDisconnect.js'
import { userHandler } from './handlers/user_handlers/index.js'

const app = express()
app.use(express.urlencoded({extended: false}), express.json())
app.use(dbConnect)

app.all('/user/*', userHandler)

app.use(dbDisconnect)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
