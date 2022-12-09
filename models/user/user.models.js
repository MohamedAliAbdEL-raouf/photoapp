
const {Schema,model} = require('mongoose');

const userschema = Schema({
    name:String,
    email:String,
    password:String,
    age:Number,
    verified:{
        type:Boolean,
        default:false
    },
    pic_url:{
        type:String,
        default:'user.png'
    }
})
module.exports=model('user',userschema)
