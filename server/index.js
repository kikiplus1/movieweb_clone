const express = require('express')
const app = express()
const port = 5000
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const {User} = require("./modele/User");
const {auth}= require("./middleware/auth")
const config = require('./confiv/key');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(cookieParser())


//몽고db연결
const mongoose = require('mongoose')
const { json } = require('body-parser')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify : false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/api/hello', (req,res)=>{
    res.send("안녕하세요~")
})

// 서버
app.get('/',(req,res) => res.send('안녕하세요!'))
app.listen(port, () => console.log('example app listening on port ${port}!'))


// 회원가입
app.post('/api/users/register',(req,res) =>{

    const user = new User(req.body)
    user.save((err, userinfo) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success : true
        })
    })
})

//로그인
app.post('/api/users/login',(req, res) => {
    //요청된 이멜을 db에서 찾는다
    User.findOne({email:req.body.email},(err,user)=>{
        if(!user){
            return res.json({
                loginSuccess : false,
                message : " 제공된 이메일에 해당하는 유저가 없습니다."
                
            })
        }
    

        //요청된 이멜이 있다면 비밀번호가 맞는지 확인
        user.comparePassword(req.body.password , (err,isMatch) =>{
            if(!isMatch)
                return res.json({loginSuccess:false, maessage:"비밀번호가 틀렸습니다."})


            //비밀번호가 맞다면 토큰을 생성하기
            user.generateToken((err,user) =>{
                if(err) return res.status(400).send(err);
                
                //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 .. 일단은 쿠키에다 저장
                res.cookie("x_auth",user.token)
                    .status(200)
                    .json({loginSuccess: true, userId : user._id})


            
            })
        })   
    })
})

//인증
app.get('/api/users/auth',auth,(req,res) =>{
    //여기까지 미들웨어를 통과해 왔다는 얘기는 인증이 됨을 의미
    res.status(200).json({
        _id: req.user._id,
        isAdmiin : req.user.role == 0? false: true,
        isAuth : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })

})

//로그아웃
app.get('/api/users/logout', auth,(req,res) =>{
    User.findOneAndUpdate({_id:req.user._id},{token:""}
    , (err, user) =>{
        if(err) return res.json({success:false, err});
        return res.status(200).send({
            success : true
        })
    })
})