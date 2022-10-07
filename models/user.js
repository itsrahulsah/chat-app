const mongoose = require('mongoose')
const chatSchema = require('./chats')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        require: true
    },
    email:{
        type: String,
        required : true,
        lowercase : true
    },
    socketId : String,

    isOnline : Boolean,

    lastOnline : {
        type : Date,
        required : true,
    },
    messageQueue : [{type : Schema.Types.ObjectId ,ref : 'Chats'}]
    
});

module.exports = mongoose.model('Users',userSchema);