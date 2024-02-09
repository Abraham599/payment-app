const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();


router.get("/balance",authMiddleware,async (req,res)=>{
    const account = await Account.findOne({
        userID: req.userID
    });
    if(account){
    res.json({
       
        balance: account.balance,
    });
}
});

router.post("/transfer",authMiddleware, async (req, res)=>{
    const session = await mongoose.startSession();
    console.log("working?");
    session.startTransaction();

    
        const{to,amount} = req.body;

        const sender = await Account.findOne({
            userID:  req.userID
        }).session(session);

        const receiver = await Account.findOne({
            userID:to
        }).session(session);

        if(!receiver){
           await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        if(!sender || sender.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({
                message:"Insufficient balance / Invalid account"
            });
        }
       await Account.updateOne({
           userID: req.userID 
        },
        {
            $inc:{
                balance:-amount
            }
        }).session(session);
        await Account.updateOne({
            userID: to
        },{
           $inc: { balance: amount }  
        }).session(session);

       await session.commitTransaction();

        return res.status(200).json({
            message:"Transfer successful"
        })
    

})

module.exports = router;