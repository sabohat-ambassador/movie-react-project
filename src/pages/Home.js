import { useEffect, useState } from "react";
// import {Swiper, SwiperSlide} from 'swiper/react'
// import Movie from '../componenets/Movie'
 import {MY_API_KEY} from '../global'
 import Movielist from "../componenets/MovieList";
 import SliderMovie from "../componenets/SliderMovie";
import Slider from "@ant-design/react-slick";

const TRENDING_MOVIES_API = `https://api.themoviedb.org/3/trending/all/day?api_key=${MY_API_KEY}`
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${MY_API_KEY}&language=en-US&include_adult=false`;


const Loader = ()=>{
    return(

        <div className='loader-ring'>
  <div className='loader-ring-light'></div>
  <div className='loader-ring-track'></div>
</div>

    )
}
const Home = () => {


    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(()=>{
        setTimeout(() => {
            fetch(TRENDING_MOVIES_API).then( res => res.json()).then(data => {
             setMovieList(data.results);
             console.log(data);
            setIsLoading(false)
            });
        },2000);
      
    }, []);


  
    // const handleSearch = (e) => {
    //     if(e.target.value.length > 2) {
    //         fetch(SEARCH_API + `&query=${e.target.value}`).then(res => res.json()).then( data => {
    //             console.log(data.results);
    //             setMovieList(data.results);
    //         });
    //     };
    // };

    return (
    <div className="page-content">
        <SliderMovie/>
      {isLoading ? <Loader/> : 

    <div>
        <Movielist  type='upcoming' title='Upcoming movies'/>
      <Movielist  type='top_rated' title='Top movies'/>
      <Movielist   type='popular' title='Popular movies'/>  
      </div>
      }
    
    </div>
       
    );

}

export default Home;
