
import React,{useEffect,useState} from 'react'
import { List, Avatar, Row, Col, Button } from 'antd';
import {API_URL , API_KEY, IMAGE_BASE_URL} from '../../../Config'
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';

function MovieDetail(props) {

    let movieId = props.match.params.movieId //영화id값 가져오기(url에서)
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts]= useState([])
    const [ActorToggle,setActorToggle] = useState(false)

    //Dom이 시작할때 
    useEffect(()=>{

        let endPointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endPointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endPointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)

        })
        
        fetch(endPointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
        })
    },[])


    //버튼 누를때마다 toggle
        const toggleActorView = () =>{
            setActorToggle(!ActorToggle)
        }
        



    return (
        <div>
            {/* Header */}
            
            {/*main image,  MainMovieImage가 있으면은 backdrop_path를 가져오게 하는 표식*/}  
              <MainImage 
                image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                title ={Movie.original_title}
                text = {Movie.overview}
              />
            

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    <Favorite movieInfo={Movie} MovieId={movieId} userFrom={localStorage.getItem('userId')}/>
                </div>
        

                {/* Movie info */}
                    <MovieInfo
                        movie={Movie}
                    />
                <br/>

                {/* Acter Grid */}    
                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <Button onClick={toggleActorView}>Toggle Actor View </Button>
                </div>
        

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts && Casts.map((cast,index)=>(

                            <React.Fragment key={index}>
                                <GridCards
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    CharacterName = {cast.name}
                                    
                                    />

                            </React.Fragment>
                            
                        ))
                        }
                    </Row>}
            </div>
           
        </div>

    
    )
}

export default MovieDetail
