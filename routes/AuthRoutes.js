const express = require('express');
const userModel = require('../models/User')

const router = express();

router.post('/validate_user', (req, res) => {
    const user = userModel.findOne({username: req.body.username})
    if (!user) {
        res.status(400).send({error: "User not found"})
    }
    if (user.password != req.body.password) {
        res.status(400).send({error: "Wrong Password"})
    }

    res.send({ validated: true })
})

module.exports = router