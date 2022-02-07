const express = require('express');
const groupMessageModel = require('../models/GroupMessage')

const router = express();

router.get('/', (req, res) => {
    const user = groupMessageModel.find({}).distinct('room', (err, rooms) => {
        if (err) {
            res.status(400).send({error: err.toString()})
        }
        res.send(rooms)
    })
})

module.exports = router