import React from 'react';
import {useState, useEffect} from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import Movie from './Movie';
import { Link } from 'react-router-dom';
import apiCalls from '../config/api';

// import {MY_API_KEY} from '../global';


const Movielist = ({type, title}) => {

    SwiperCore.use([Autoplay]);

  const [moviesList, setMoviesList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {

    const getMovies = async () => {
      try {
          const data = await apiCalls.getMovies(type);
          setMoviesList(data.results);
          // console.log(data.results);
      } catch (error) {
          setError(error.message);
      }
     
    }
    getMovies();
  },[type]);


  return (
    <div className='type-movies'>
        <div className='d-flex'>

        <h2 className="movie-title">{title}</h2> 
      <Link to='/catalog' className='all'>All</Link>
        </div>
        {!error && <Swiper
                modules={[Autoplay]} spaceBetween={25} slidesPerView={4}
                autoplay={{
                  delay: 2000, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
              }}
              breakpoints={{
                "992": {
                  "slidesPerView": 4,
                  "spaceBetween": 20
                },"767": {
                  "slidesPerView": 2,
                  "spaceBetween": 20
                },"450": {
                  "slidesPerView": 2,
                  "spaceBetween": 20
                }}}
            >
                {moviesList.map( el => ( <SwiperSlide key={el.id}><Movie movieObj={el}  /></SwiperSlide> ))}
            </Swiper>}

        {error && <div>{error}</div>}
    </div>
  );
}

export default Movielist;
