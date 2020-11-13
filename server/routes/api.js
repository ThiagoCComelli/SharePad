const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/NotePads')
const NotePads = mongoose.model('NotePads')

router.post('/saveData', (req,res) => {
    NotePads.findOneAndUpdate({notePad:req.body.room},{content:req.body.content}).then((notePad) => {
        if(!notePad){
            const newNotePads = new NotePads({
                notePad:req.body.room,
                content:req.body.content
            })

            newNotePads.save()
        } 
        res.json(true)
    }).catch((err) => {
        res.json(false)
    })
})

router.get('/getData',(req,res) => {
    NotePads.find({notePad:req.header('room')}).then((notePad) => {
        res.json(notePad)
    }).catch((err) => {
        res.json(false)
    })
})

module.exports = router