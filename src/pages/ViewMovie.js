import { useEffect } from "react";
import { useParams , Link} from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { MY_API_KEY } from "../global";
import {ORIGINAL_IMAGE_URL} from '../global'
import Actorcard from '../componenets/Actorcard'
import Similarcard from '../componenets/Similarcard'
import SwiperCore, { Autoplay } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';


const Imageurl = 'https://image.tmdb.org/t/p/w500'

const SINGLE_MOVIE_API = `https://api.themoviedb.org/3/movie/`;
const API_PARAMS = `?api_key=${MY_API_KEY}&language=en-US`;
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const ViewMovie = () => {

    const [movieInfo, setMovieInfo] = useState({});
    const [actorsList, setActorInfo] = useState([]);
    const [similar, setSimilar] = useState([])
    const [error, setError] = useState([])
    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        fetch(SINGLE_MOVIE_API + id + API_PARAMS).then( res => res.json()).then(data => {
            setMovieInfo(data);
        });
        fetch(SINGLE_MOVIE_API + id +'/credits'+ API_PARAMS)
        .then((res) => {
          if (!res.ok) {
            throw Error("Serverda ma'lumot olishda xatolik!!");
          }
          return res.json();
        })
        .then((data) => {
          setActorInfo(data.cast);
          console.log(data)
        })
        fetch(SINGLE_MOVIE_API + id +'/similar'+ API_PARAMS)
        .then((res) => {
          if (!res.ok) {
            throw Error("Serverda ma'lumot olishda xatolik!!");
          }
          return res.json();
        })
        .then((data) =>{
          setSimilar(data.results);
          console.log(data)
        })
        .catch((err) => {
            console.log(err.message)
            setError(err.message);
        });
        
    }, []);

    // const mappedActors = actorsList.map((actor,index) => (
    //     <Actorcard
    //       // id={actor.id}
    //       // name={actor.original_name}
    //       // imgLink={IMAGE_URL + actor.profile_path}
    //       // charName = {actor.character}
    //       key={index} actor={actor}
    //     />
    // ))
    const mappedSimilar = similar.map((similar,index) => (
      <Similarcard
        key={index} similar={similar}
      />
  ))

  SwiperCore.use([Autoplay]);

    return (
        <div>

        <div className='bgimage' style={{ backgroundImage: `url(${ORIGINAL_IMAGE_URL + movieInfo.backdrop_path})`}}>
        
        
        <div className='viewPage'>
            <img className='viewImg' src={Imageurl + movieInfo.poster_path}/>
            <h2 className='movieName'> {movieInfo.title}</h2>
            <p className='movieText'>{movieInfo.overview}</p>
            <div className='others'>
            <h4 className='country'>Popularity: { movieInfo.popularity}</h4>
            <h4>Release date: {movieInfo.release_date}</h4>
            
             </div>
        </div>
        </div>
        <h2 className='actors'>Actors</h2>

        <div className='actorscard'>
        <Swiper modules={[Autoplay]} spaceBetween={10} slidesPerView={5}
        autoplay={{
            delay: 1000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }}
      >
        {actorsList.map( el => ( <SwiperSlide key={el.id}> <Actorcard actor={el} /> </SwiperSlide>))}
       
      </Swiper>
        </div>
        <h2 className='similars'>Similar Movies</h2>
        <div className='similarcard'>
         {mappedSimilar}
        </div>
        </div>
    )
}

export default ViewMovie;