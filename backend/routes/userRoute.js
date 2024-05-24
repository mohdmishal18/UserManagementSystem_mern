import express from 'express'
import
{ 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter
.post('/' ,registerUser)
.post('/auth' , authUser)
.post('/logout', logoutUser)

.route('/profile')
.get(getUserProfile)
.put(updateUserProfile)





export default userRouter;