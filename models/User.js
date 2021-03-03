const mongoose = require("mongoose") 
const Schema = mongoose.Schema;

const userShema = new Schema({
    login:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('users',userShema)