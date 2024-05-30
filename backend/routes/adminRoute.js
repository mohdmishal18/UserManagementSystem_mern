import express from 'express'
import { adminProtect } from '../middlewares/adminAuthMiddleware.js'
import { 
    authAdmin,
    logoutAdmin,
    getUsers,
    addNewUser

} from '../controllers/adminController.js'

const adminRoute = express.Router()

adminRoute
.post('/' , authAdmin)
.post('/logout' , logoutAdmin)
.get('/users', adminProtect , getUsers)
.post('/users' , adminProtect, addNewUser)
// .route('/users')
// .get(adminProtect , getUsers)
// .post(adminProtect, addNewUser)
// .put(adminProtect , editUser)

export default adminRoute;