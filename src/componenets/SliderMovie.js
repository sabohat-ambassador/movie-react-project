import React from "react";
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react';
import SwiperCore, { Autoplay } from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import {ORIGINAL_IMAGE_URL} from '../global'
import {MY_API_KEY} from '../global'

const Slider=()=>{
    SwiperCore.use([Autoplay]);


    const Imageurl = 'https://image.tmdb.org/t/p/w500';
    const [sliderList, setSliderList] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/popular/?api_key=${MY_API_KEY}`).then(res => res.json())
          .then(data => {
              const arr = data.results.slice(0,4)
            setSliderList(arr);
          });
      },[]);

    return(
        <Swiper modules={[Autoplay]} spaceBetween={0} slidesPerView={1}
        autoplay={{
            delay: 2000, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }}
      >
        {sliderList.map( el => ( <SwiperSlide key={el.id}>
        <div className='bgimage' style={{ backgroundImage: `url(${ORIGINAL_IMAGE_URL + el.backdrop_path})`}}>
          <div className='objects'>
          <img  className='viewImg' src={Imageurl + el.poster_path}/>
          <h3 className='movieName'>{el.title}</h3>
          <p className='movieText'>{el.overview}</p>
             <Link className='viewPopular' to={`/movie/${el.id}`}>View the Movie</Link>
            </div>
        </div>  
        
          </SwiperSlide>))}
       
      </Swiper>
        
    )
}

export default Slider