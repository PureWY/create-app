const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatid: {type: String, required: true},
    from: {type: String,required: true},
    to: {type: String,required: true},
    content: {type: String,required: true,default: ''},
    create_time: {type: Number,default: new Date().getTime()},
    read: {type: Boolean,default: false}
})

const Chat = mongoose.model('Chat',chatSchema);

module.exports = Chat