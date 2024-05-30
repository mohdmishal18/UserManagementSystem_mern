import express from 'express'
import { adminProtect } from '../middlewares/adminAuthMiddleware.js'
import { 
    authAdmin,
    logoutAdmin,
    getUsers,
    addNewUser,
    editUser

} from '../controllers/adminController.js'

const adminRoute = express.Router()

adminRoute
.post('/' , authAdmin)
.post('/logout' , logoutAdmin)
.get('/users', adminProtect , getUsers)
.post('/users' , adminProtect, addNewUser)
.put('/users', adminProtect, editUser)


export default adminRoute;