const mongoose = require("mongoose") 
const Schema = mongoose.Schema;

const scoreShema = new Schema({
    user:{
        ref:'users',
        type: Schema.Types.ObjectId
    },
    begginer:{
        type: Array,
        required: true
    },
    medium:{
        type: Array,
        required: true
    },
    expert:{
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('scores',scoreShema)