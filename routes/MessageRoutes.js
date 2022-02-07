const express = require('express');
const privateMessageModel = require('../models/PrivateMessage')
const groupMessageModel = require('../models/GroupMessage')

const router = express();

router.post('/private', async (req, res) => {
    try {
        const messages = await privateMessageModel.find({from_user: req.body.from_user, to_user: req.body.to_user})
        res.send(messages)
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

router.get('/room/:room', async (req, res) => {
    try {
        const messages = await groupMessageModel.find({room: req.params.room}).sort({"date_sent": 1})
        res.send(messages)
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }

})

router.post('/send_private', async (req, res) => {
    const privateMessage = new privateMessageModel(req.body)

    try {
        await privateMessage.save()
        res.send(privateMessage)
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

router.post('/send_room/:room', async (req, res) => {
    const groupMessage = new groupMessageModel(req.body)

    try {
        await groupMessage.save()
        res.send(groupMessage)
    } catch (err) {
        res.status(500).send({error: err.toString()})
    }
})

module.exports = router