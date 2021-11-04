import GenresList from "../componenets/GenresList";
import MoviesGrid from "../componenets/MovieGrid";
import styled from "styled-components";
import { useParams } from 'react-router';


const PageContent = styled.section `
  margin-top: 97px;
  padding: 70px 0;
`;

const Wrapper = styled.div `
  background-color: #16151A;
  display: flex;
  justify-content: space-between;
`;

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