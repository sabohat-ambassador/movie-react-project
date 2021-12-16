import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {ORIGINAL_IMAGE_URL} from '../global'
import Actorcard from '../componenets/Actorcard'
import Similarcard from '../componenets/Similarcard'
import SwiperCore, { Autoplay } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import apiCalls from '../config/api';

const Imageurl = 'https://image.tmdb.org/t/p/w500'


const ViewMovie = () => {

    const [movieInfo, setMovieInfo] = useState({});
    const [actorsList, setActorInfo] = useState([]);
    const [similar, setSimilar] = useState([])
    const [error, setError] = useState()
    const { id } = useParams();

    useEffect(() => {
      const detail = async () => {
        try {
          const data = await apiCalls.detail(id);
          setMovieInfo(data);
          console.log(data)
        } catch (error) {
            setError(error.message);
        };
      };
      detail();
        const actorsAndCast = async () => {
          try {
              const data = await apiCalls.actorsAndCast(id);
              setActorInfo(data.cast);
              // console.log(data.results);
          } catch (error) {
              setError(error.message);
          }
         
        }
        actorsAndCast();
        
        const similar = async () => {
          try {
              const data = await apiCalls.similar(id);
              setSimilar(data.results);
              // console.log(data.results);
          } catch (error) {
              setError(error.message);
          }
         
        }
        similar();
        
    }, [id]);

  
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
            <img className='viewImg' src={Imageurl + movieInfo.poster_path} alt=''/>
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
        breakpoints={{
          "992": {
            "slidesPerView": 5,
            "spaceBetween": 20
          },"767": {
            "slidesPerView": 3,
            "spaceBetween": 20
          },"566": {
            "slidesPerView": 2,
            "spaceBetween": 20
          },"430": {
            "slidesPerView": 2,
            "spaceBetween": 20
          }}}
      >
        {actorsList.map( el => ( <SwiperSlide key={el.id}> <Actorcard actor={el} /> </SwiperSlide>))}
       
      </Swiper>
        </div>
        <h2 className='similars'>Similar Movies</h2>
        <div className='similarcard'>
         {mappedSimilar}
        </div>
        {error && <div>{error}</div>}
        </div>
     
    )
}

export default ViewMovie;