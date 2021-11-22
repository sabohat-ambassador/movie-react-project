
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import apiCalls from "../config/api";

const Genres=()=>{

    const [genresList, setGenresLIst] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
     
      const genres = async () => {
        try {
            const data = await apiCalls.genres();
            console.log(data)
            setGenresLIst(data.genres);
      
        } catch (error) {
            setError(error.message);
        }
       
      }
      genres();
        // fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${MY_API_KEY}`).then(res => res.json())
        //   .then(data => {
        //     setGenresLIst(data.genres);
        //   });
      },[]);
    return(

        genresList.map((el,index)=>{
           return <Link className='genres' to={`/catalog/${el.id}`} key={index}>{el.name}
           
           {error && <div>{error}</div>}
           </Link>
           
          })
                 
    )
    }

export default Genres
