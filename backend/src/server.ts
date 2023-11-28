import express from 'express'
import { dbConnect } from './middleware/dbConnect.js'
import { dbDisconnect } from './middleware/dbDisconnect.js'
import { userHandler } from './handlers/user_handlers/index.js'
import { authenticate } from './middleware/authenticate.js'
import { noteHandler } from './handlers/note_handlers/index.js'
import { handleCors } from './handlers/handleCors.js'

const app = express()
app.use(express.urlencoded({extended: false}), express.json())
app.use(handleCors)
app.use(dbConnect)
app.use(authenticate)


app.all('/user', userHandler)
app.all('/notes', noteHandler)

app.use(dbDisconnect)

app.listen(3000, () => {
    console.log('Listening on port 3000')
})
