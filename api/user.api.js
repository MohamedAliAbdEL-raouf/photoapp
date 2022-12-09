const { signUp } = require('../service/user.service')

const app = require('express').Router()

app.post('/signUp' , signUp)

module.exports =app