import React,{useEffect,useState} from 'react'
import {Button} from 'antd';
import axios from 'axios';


function Favorite(props) {

    const [FavoriteNumber,setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    const movieId = props.MovieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    let variables = {
        userFrom : userFrom ,
        movieId : movieId,
        movieTitle : movieTitle,
        moviePost : moviePost,
        movieRunTime : movieRunTime
    }
    
    useEffect(() => {
        axios.post('/api/favorite/favoriteNumber',variables)
            .then(response=>{
                if(response.data.success){
                    setFavoriteNumber(response.data.favoriteNumber)
           
                    

                }else{
                    alert('숫자 정보를 가져오는데 실패 했습니다.')
                }
            })

        axios.post('/api/favorite/favorited',variables)
            .then(response=>{
                if(response.data.success){
                    setFavorited(response.data.favorited)

                }else{
                    alert('정보를 가져오는데 실패 했습니다.')
                }
            })
    },[])


    const onClickFavorite = () => {
        if (Favorited) {
            axios.post('/api/favorite/removeFromFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)
                    } else {
                        alert('Favorite 리스트에서 지우는 걸 실패했습니다.')
                    }
                })


        } else {
            axios.post('/api/favorite/addToFavorite', variables)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)

                    } else {
                        alert('Favorite 리스트에서 추가하는 걸 실패했습니다.')
                    }
                })
        }
    }

        
    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "싫어요":"좋아요"} : {FavoriteNumber}</Button>
        </div>
    )
    
}

export default Favorite