const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotePads = new Schema({
    date:{
        type:Date,
        default:Date.now()
    },
    notePad:{
        type:String
    },
    content:{
        type:String
    }
})

mongoose.model('NotePads', NotePads)