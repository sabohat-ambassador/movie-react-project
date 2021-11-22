import GenresList from "../componenets/GenresList";
import MoviesGrid from "../componenets/MovieGrid";
import { useParams } from 'react-router';




const Catalog = () => {
    const {genreid} = useParams();
    return (
      <div className="container">
        <div className='genresList'>

            <div className='row'>
                 <GenresList/>
            </div>
          <MoviesGrid genre={genreid} />
        </div>
       
      </div>

  );
}

export default Catalog