const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://abrahamrichard:richy599@cluster0.8afhjv3.mongodb.net/paytm");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true,
        trim: true,
        lowercase:true,
        minLength:3,
        maxLength:50,
    },
    password: {
        type:String,
        required: true,
        minLength: 6,
    },
    firstName: {
        type:String,
        required:true,
        trim: true,
        maxLength: 50,
    },
    lastName: {
        type:String,
        required:true,
        trim:true,
        maxLength: 50,
    },
});

const accountSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance:{
        type:Number,
        required: true
    }
});

const User = mongoose.model("User",userSchema);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
	User,
    Account
};