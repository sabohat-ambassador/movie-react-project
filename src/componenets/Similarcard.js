import { Link } from "react-router-dom";


const Similar=(props)=>{
    const IMAGE_URL = "https://image.tmdb.org/t/p/w500";
       return(
        <Link to={`/movie/${props.similar.id}`} className='Card'>
            <img className='similarMovie' src={IMAGE_URL + props.similar.poster_path} alt='similar'/>
            <p className='similar-title'>{props.similar.title}</p>
        </Link>
    )
}

export default Similar