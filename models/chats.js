const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatSchema = new Schema({
    from : {
        type: String,
        required : true,
        ref : 'Users'
    },
    message : {
        type: String,
        required : true,
        ref : 'Users'
    },
    from : {
        type: String,
        required : true,
    },
    timesatmp:{
        type : Date,
        required : true,
    }
})

module.exports = mongoose.model('Chats',chatSchema)