const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');


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
        minlength : 5
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
//저장하기전에 실행
userSchema.pre('save',function(next){
    var user = this; // 입력한 비밀번호 가져오기

    //비밀번호가 변경될 경우에만
    if(user.isModified('password')) {
        //비밀번호를 암호화시킨다.
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err)

            bcrypt.hash(user.password,salt,function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }else{
        next()
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //암호화해서 동일한 패스워드인지 확인하기
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })

}

userSchema.methods.generateToken = function(cb){
    //jsonwebtoken을 이용해서 token을 생성하기
    var user = this;
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    //user._id + 'secreToken' = token

    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    //토큰을 디코드 한다.
    jwt.verify(token, 'secretToken',function(err,decoded){
        // 유저 아이디를 이용해 유저를 찾은 다음
        // 클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
        
        user.findOne({"_id": decoded, "token":token}, function(err,user){
            if(err) return cb(err);
            cb(null, user);
        })

    })
}



const User = mongoose.model('User', userSchema)
module.exports = {User}  //외부에서 사용 가능하게