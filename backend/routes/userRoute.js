const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User,Account } = require("../Models/db");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../config");

const {authMiddleware}=require('../middleware')

const signupBody = zod.object({
    email: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})


const signinBody = zod.object({
    email: zod.string().email(),
    password: zod.string()
})

router.post('/signup',async(req,res)=>{
    const { success } = signupBody.safeParse(req.body)

    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const {email,password}=req.body;

    const UserExists=await User.findOne({
        email:email
    })

    if(UserExists){
        return res.status(411).json({
            msg:"already Exists"
        })
    }

    const newUser=await User.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:email,
        password:password
    })

    const userId=newUser._id

    await Account.create({
        userId:userId,
        balance: 1+Math.random() * 100000
    })

    return res.json({ 
        msg:"user created successfully!"
    })
})


router.post('/signin',async(req,res)=>{
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const {email,password}=req.body;

    const UserExists=await User.findOne({
        email:email
    })

    if(UserExists){
        const token=jwt.sign({
            email:email,
            id:UserExists._id
        },jwt_secret)

        return res.json({token:"Bearer "+token})
    }

    return res.status(411).json({err:"User Doesn't exists!"})
})


router.put('/updateInfo',authMiddleware,async(req,res)=>{
    const email=req.email

    const {firstName,lastName,password}=req.body

    if(firstName && lastName && password)
    {
        await User.updateOne({
            email:email
        },{
            "$set":{
                firstName:firstName,
                lastName:lastName,
                password:password
            }
        })
    }

    else if(firstName)
    {
        await User.updateOne({
            email:email
        },{
            "$set":{
                firstName:firstName,
            }
        })
    }

    else if(lastName)
    {
        await User.updateOne({
            email:email
        },{
            "$set":{
                lastName:lastName,
            }
        })
    }

    else if(password)
    {
        await User.updateOne({
            email:email
        },{
            "$set":{
                password:password
            }
        })
    }

    else if(firstName && lastName)
    {
        await User.updateOne({
            email:email
        },{
            "$set":{
                firstName:firstName,
                lastName:lastName,
            }
        })
    }

    res.json({msg:"Update Successful!"})
})


router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports=router