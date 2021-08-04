const express = require('express');
const router = express.Router();
const{Favorite} = require('../modele/Favorite')


router.post("/favoriteNumber", (req, res) => {

    //망고db에서 favorite숫자를 가져오기
    Favorite.find({"movieId":req.body.movieId})
    .exec((err, info)=>{
        if(err) return res.status(400).send(err) //send는 텍스트 형식으로 보내줌
        return res.status(200).json({
            //그다음 프론트에 다시 숫자 정보 보내주기
            success: true, favoriteNumber:info.length
         })
    });
});
router.post("/favorited", (req, res) => {

    //내가 이 영화를 favorite리스트에 넣었는지 db에서 정보를 확인
    Favorite.find({"movieId":req.body.movieId,"userFrom":req.body.userFrom})
    .exec((err, info)=>{  //exec는 정해진 조건으로 쿼리를 실행할때 사용함
        if(err) return res.status(400).send(err)

        let result = false;
        if(info.length !=0){
            result = true
        }
        return res.status(200).json({
            success: true, favorited:result 
         })
    });
});


router.post('/removeFromFavorite', (req, res) => {

    Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })
        .exec((err, doc) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, doc })
        })

})

router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body)

    favorite.save((err, doc) => {
        if (err) return res.status(400).send(err)
        return res.status(200).json({ success: true })
    })

})



module.exports = router;