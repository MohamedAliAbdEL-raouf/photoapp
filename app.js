const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const mongoose=require('mongoose')
app.use(require("./api/user.api"))
app.use(require("./api/photo.api"))
 
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

mongoose.connect('mongodb://localhost:27017/photoApp') 