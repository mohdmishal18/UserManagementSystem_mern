import asyncHandler from "express-async-handler"
import User from '../models/userModel.js'
import generateToken from '../utils/generateTokens.js'
import cloudinary from '../utils/cloudinary.js'

const authAdmin = asyncHandler(async (req, res) =>
{
    const { email , password } = req.body

    const admin = await User.findOne({email})

    if(admin && admin.isAdmin && (await admin.matchPassword(password)))
    {
        generateToken(res , admin._id , "adminJWT")
        res.status(201).json({
            _id : admin._id,
            name : admin.name,
            email : admin.email,
            profileImage : admin.profileImage
        })
    }
    else
    {
        res.status(400)
        throw new Error('Invalid Email or Password')
    }
})

const logoutAdmin = asyncHandler(async (req, res) =>
{
    res.cookie('adminJWT','',{
        httpOnly : true,
        expires : new Date(0)
    })
    res.status(200).json({message : 'Admin Logged Out'})
})

const getUsers = asyncHandler(async (req, res) => 
{
    const usersData = await User.find({ isAdmin: { $ne: true } });
  
    res.status(200).json(usersData);
});

export 
{
    authAdmin,
    logoutAdmin,
    getUsers,
    
}