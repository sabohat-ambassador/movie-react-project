
import { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import Movie from './Movie';
import apiCalls from '../config/api';


import { useEffect } from "react/cjs/react.development";



const Card = styled.div `
  width: 80%;
  padding: 50px;
  border-radius: 10px;
  background-color: #16151A;
  margin: 0 auto;
`;

const Title = styled.span `
  font-size: 24px;
  font-weight: 700;
  color: #FFF;
`;

const Btn = styled.button `
  width: 145px;
  height: 42px;
  padding: 8px 0;
  border: none;
  border-radius: 5px;
  margin: 10px 10px 0 0;
  background-color: mediumturquoise;;
  font-size: 17px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
`;

const Label = styled.span `
  color: #FFF;
`;

 

const BigFilter = () => {

  const [year, setYear] = useState('');
  const [sort, setSort] = useState('');
  const [genre,setGenre] = useState('')
  const sortOptions = [
    { value: 'popularity.asc', label: 'Popularity' },
    { value: 'release_date.asc', label: 'Release Date' },
    { value: 'revenue.asc', label: 'Budget' },
    { value: 'vote_average.asc', label: 'Rating' },
    { value: 'original_title.asc', label: 'Title' }
  ];

  const yearOptions = [
    { value: '2000', label: '2000' },
    { value: '2001', label: '2001' },
    { value: '2002', label: '2002' },
    { value: '2003', label: '2003' },
    { value: '2004', label: '2004' },
    { value: '2005', label: '2005' },
    { value: '2006', label: '2006' },
    { value: '2006', label: '2006' },
    { value: '2007', label: '2007' },
    { value: '2008', label: '2008' },
    { value: '2009', label: '2009' },
    { value: '2010', label: '2010' },
    { value: '2011', label: '2011' },
    { value: '2012', label: '2012' },
    { value: '2013', label: '2013' },
    { value: '2014', label: '2014' },
    { value: '2015', label: '2015' },
    { value: '2016', label: '2016' },
    { value: '2017', label: '2017' },
    { value: '2018', label: '2018' },
    { value: '2019', label: '2019' },
    { value: '2020', label: '2020' },
    { value: '2021', label: '2021' },
    { value: '2022', label: '2022' }
  ];

  // server dan olish kerak



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

      
      },[]);
  

  const genreOptions = genresList.map(el =>{
    return {
        value: el.id,
        label: el.name
    }
    
})


  

  const handleYearChange = (newValue) => {
    setYear(newValue.value);
    console.log(newValue);
  };
  const handleSortChange = (newValue) => {
    setSort(newValue.value);
    console.log(newValue);
  };
  const handleGenreChange = (newValue) => {
    const llll = newValue.map(el => el.value
    )
    setGenre(llll);
    console.log(`${llll}`);
  };



  const [discover, setDiscover] = useState([])

  const handleDiscover = async () =>{
  
    try {
      const data = await apiCalls.discover({
        language: "en-US",
        include_adult: false,
        with_genres: genre,
        sort_by: sort,
        page: 1,
        year: year
      });
      console.log(data);
      setDiscover(data.results);
      
  } catch (error) {
      setError(error.message);
  }
}
    
    
    
    
      const mappedDiscover =  discover.map( el => ( <Movie key={el.id} movieObj={el} /> ))
      


  return (
    <Card>
      <Title> <div className="filter" /> Filter </Title>
      <form className='form' method="get">
        <Label>Year</Label>
        <Select options={yearOptions} onChange={handleYearChange} />
        <Label>Genre</Label>
        <Select options={genreOptions} isMulti onChange={handleGenreChange} />
        <Label>Sort by</Label>
        <Select options={sortOptions} onChange={handleSortChange} />
        <br />
        <Btn className="search-btn" type="button" onClick={handleDiscover}>  Discover </Btn>
        <Btn> Found <span></span> movies </Btn>
      </form>
      <div className='flex'>

   {mappedDiscover}
      </div>
      {error && <div>{error}</div>}
   </Card>
  
  );
};

export default BigFilter;