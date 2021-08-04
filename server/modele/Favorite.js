const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const favoriteSchema = mongoose.Schema({
    userFrom : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },

    movieId:{
        type : String,
       
    },

    movieTitle:{
        type : String,
    },

    moviePost:{
        type : String,
    },

    movieRunTime:{
        type : String,
    }
    }, { timestamps: true })

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = {Favorite}  //외부에서 사용 가능하게