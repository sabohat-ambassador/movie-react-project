import { useEffect, useState } from 'react';

import Movie from '../componenets/Movie';
import usePrevious from '../hooks';
import apiCalls from '../config/api';


const MoviesGrid = (props) => {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const prevGenre = usePrevious(props.genre);
  const [error, setError] = useState()
  const loadMore = () => {
    setPage(page + 1);
    console.log(page);
  };

  useEffect(() => {
    let list;
    if(prevGenre !== props.genre) {
      list = []
    } else {
      list = movies;
    }
    const discover = async () => {
      try {
        const data = await apiCalls.discover({
          language: "en-US",
          include_adult: false,
          with_genres: props.genre,
          page
        });
        setMovies(list.concat(data.results));
        setTotalPage(data.total_pages);
        console.log(data)
      } catch (error) {
        setError(error.message);
      };
    };
    discover()
  //   fetch( BY_GENRES + props.genre + '&page=' + page ).then(res=> res.json()).then(data => {
  //     setMovies(list.concat(data.results));
  //     setTotalPage(data.total_pages);
  //   });
  }, [props.genre, page, movies, prevGenre]);
  
  return (
    <div className="col">
      <h2 className="catalog-title"> Movies count: {movies.length} </h2>
      <div className='grid'>
        {movies.map( (el, i) => <Movie movieObj={el} key={i} /> )}
      </div>
      {
        page < totalPage ? <button type="button" onClick={loadMore}>Load more</button> : ''
      }
        {error && <div>{error}</div>}
    </div>
  );
};

export default MoviesGrid;