import express from 'express'
import { dbConnect } from './middleware/dbConnect.js'
import { dbDisconnect } from './middleware/dbDisconnect.js'
import { loginHandler } from './handlers/auth_handlers/loginHandler.js'
import { signupHandler } from './handlers/auth_handlers/signupHandler.js'

const auth = express()
auth.use(express.urlencoded({extended: false}), express.json())
auth.use(dbConnect)

auth.post('/signup', signupHandler)
auth.post('/login', loginHandler)

auth.use(dbDisconnect)

auth.listen(4000, () => {
    console.log('Auth server listening on port 4000')
})