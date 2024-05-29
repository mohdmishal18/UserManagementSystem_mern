import express from 'express'
import { adminProtect } from '../middlewares/adminAuthMiddleware.js'
import { 
    authAdmin,
    logoutAdmin,
    getUsers,


} from '../controllers/adminController.js'

const adminRoute = express.Router()

adminRoute
.post('/' , authAdmin)
.post('/logout' , logoutAdmin)

.route('/users')
.get(adminProtect , getUsers)
// .post(adminProtect , addNewUser)
// .put(adminProtect , editUser)

export default adminRoute;