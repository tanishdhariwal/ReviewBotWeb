const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bcrypt = require('bcryptjs');
const chatSchema = require('./Chat');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 50,
        unique: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'is invalid']
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    }
    ,
    chatProducts: [{
        ProductASIN: {
            type: String,
            required: true,
            unique: true
        }
    }]
     
});

// salt is a random string that is used to hash the password, 
//it is stored in the database along with the hashed password


UserSchema.pre('save',async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

// bcrypt knows the salt by looking at the hashed password, this avoids storing salt again

UserSchema.methods.comparePass = async function (Password){ 
    console.log(this.password,Password);
    const matched = await bcrypt.compare(Password,this.password);
    return matched;
}



module.exports = mongoose.model('User', UserSchema);