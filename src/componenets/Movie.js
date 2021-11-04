import {Link} from 'react-router-dom'
const Imageurl = 'https://image.tmdb.org/t/p/w500'

const Movie = ({movieObj})=>{
    const url = `/movie/${movieObj.id}`
    return(
        <div className='movie' >
          
        <img className='photo' src={Imageurl + movieObj.poster_path} alt={movieObj.title}/>
        <div className='card-title'>
        <p className='movie-name'> {movieObj.title ? movieObj.title : movieObj.name}</p>
        
        <div className='linkView'>

        <Link className='view' to={url}>View the Movie</Link>
        </div>

        </div>
        </div>
    )
}

export default Movie