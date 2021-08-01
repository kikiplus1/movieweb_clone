const mongoose= require('mongoose')

const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50
    },

    email:{
        type : String,
        trim : true, //빈칸 없애주기
        unique : 1
    },

    password:{
        type : String,
        maxlength : 5
    },

    lastname:{
        type : String,
        maxlength : 50
    },

    role:{
        type : Number,
        default : 0
    },

    image : String,

    token:{
        type: String
    },

    tokenExp: {
        type : Number
    }
})

const User = mongoose.model('User', userSchema)
module.exports = {User}  #외부에서 사용 가능하게