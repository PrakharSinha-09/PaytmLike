const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const {User,Account}=require('../Models/db')

const {authMiddleware}=require('../middleware')


router.get('/balance',authMiddleware,async(req,res)=>{
    const userId=req.id
    const account=await Account.findOne({
        userId:userId
    })
    console.log(account);
    console.log(account.balance);
    res.json({
        balance:account.balance
    })
})

router.post("/transfer", authMiddleware, async (req, res) => {
    const userId=req.id
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    // Fetching the accounts within the transaction
    const account = await Account.findOne({ userId: userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
        message: "Transfer successful"
    });
});

module.exports=router