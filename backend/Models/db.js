const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://prakharsinha2k2:ERZSe1i3Brj4JWJK@cluster0.nuhxhgl.mongodb.net/paytm')

const UserSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
 
    lastName:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const User=mongoose.model('User',UserSchema)
const Account = mongoose.model('Account', accountSchema);

module.exports={
    User,
    Account
}