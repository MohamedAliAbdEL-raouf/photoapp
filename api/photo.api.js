const { uploadImg } = require('../common/uploadimg');
const { addPhoto, up, down, getPhoto } = require('../service/photo.service');

const app = require('express').Router();

app.post('/addPhoto',uploadImg('path'),addPhoto);
app.post('/up',up);
app.post('/down' , down);
app.get('/getphoto' , getPhoto);

module.exports =app
