import React from 'react';
import {useState, useEffect} from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import Movie from './Movie';
import { Link } from 'react-router-dom';

import {MY_API_KEY} from '../global';


const Movielist = ({type, title}) => {

    SwiperCore.use([Autoplay]);

  const [moviesList,setMoviesList] = useState([]);


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=${MY_API_KEY}`).then(res => res.json())
      .then(data => {
        setMoviesList(data.results);
      });
  },[]);


  return (
    <div className='type-movies'>
        <div className='d-flex'>

        <h2 className="movie-title">{title}</h2> 
      <Link to='/catalog' className='all'>All</Link>
        </div>
      <Swiper modules={[Autoplay]} spaceBetween={25} slidesPerView={4}
        autoplay={{
            delay: 2000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }}
      >
        {moviesList.map( el => ( <SwiperSlide key={el.id}> <Movie movieObj={el} /> </SwiperSlide>))}
       
      </Swiper>
    </div>
  );
}

export default Movielist;
