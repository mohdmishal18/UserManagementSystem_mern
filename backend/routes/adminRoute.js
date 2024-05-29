import express from 'express'

import { 
    authAdmin,
    logoutAdmin

} from '../controllers/adminController.js'

const adminRoute = express.Router()

adminRoute
.post('/' , authAdmin)
.post('/logout' , logoutAdmin)

export default adminRoute;