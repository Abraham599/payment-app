require("dotenv").config();
const express = require("express");
const router = express.Router();

const zod = require("zod");
const { User, Account } = require("../db");
const jwt= require("jsonwebtoken");
const  { authMiddleware } = require("../middleware");



const signupBody= zod.object({
    username:zod.string().email(),
    password: zod.string(),
    firstName : zod.string(),
    lastName:zod.string()
})

router.get("/me", authMiddleware, async (req, res) => {
    const userID = req.userID;
    if (!userID) {
        return res.status(403).json({ msg: "User is not logged in" });
    }

    try {
        // Find the details of the logged-in user
        const userDetails = await User.findById(userID);

        // Find all users except the logged-in user
        const users = await User.find({ _id: { $ne: userID } });

        // Find the account details of the logged-in user
        const accountDetails = await Account.findOne({ userID: userID });

        // Prepare the response object
        const response = {
            user: {
                firstName: userDetails.firstName,
                lastName: userDetails.lastName
            },
            otherUsers: users.map(user => ({ // Iterate over users array and map to new object
                firstName: user.firstName,
                lastName: user.lastName,
                id:user._id
            })),
            account: {
                balance: accountDetails.balance
            }
        };

        // Log the response before sending it to the client
        console.log("Response sent to client:", response);

        // Send the response to the client
        res.status(200).json(response);
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post("/signup",async (req,res)=>{
    const {success} = signupBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already exists/taken"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password:req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName

    });

    const userID  =user._id;

    await Account.create({
        userID,
        balance: Math.floor(Math.random()*10000)+1
    })

    const token = jwt.sign({
        userID},process.env.JWT_SECRET
    );

    res.status(200).json({
        message:"You have successfully created an account",
        token: token

    });

    
})
const signinBody = zod.object({
    username:zod.string().email(),
    password:zod.string()
});

router.post("/signin",async (req,res)=>{
const {success} = signinBody.safeParse(req.body);
if(!success){
    return res.status(411).json({
        message: "Wrong email or password!"
    });
}
const existingUser = await User.findOne({
    username: req.body.username,
    password: req.body.password

});

if(!existingUser){
    return res.status(411).json({
        message: "User doesn't exist"
    });
}

const token = jwt.sign({
    userID:existingUser._id
},process.env.JWT_SECRET);

res.status(200).json({token:token});

return;


})

// const updatedBody = zod.object({
//     firstName: zod.string().optional(),
//     lastName: zod.string().optional(),
//     password: zod.string().optional()
// });

// router.put("/",async (req,res)=>{
//    const {success} = updatedBody.safeParse(req.body);
   
//    if(!success){
//     return res.status(411).json({message:"Please enter correct format"});
//    }
//   await User.updateOne(req.body,{
//     id:req.userID
//   });

//   res.status(200).json({message:"Updated the information"});

// })





module.exports = router;