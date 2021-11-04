
import { useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import Movie from './Movie';
import { Link } from "react-router-dom";

import { useEffect } from "react/cjs/react.development";
import {MY_API_KEY} from '../global'


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

const NameInput = styled.input `
  width: 100%;
  padding: 7px 0 7px 10px;
  margin-top: 15px;
`;

const Selectt = styled.select `
  width: 145px;
  margin: 10px 10px 0 0;
  cursor: pointer;
`;

const Country = styled.span `
   position: relative;
   display: inline-block;
   width: 145px;
   margin: 10px 0 0;
   vertical-align: top;
   cursor: pointer;
`;

const Box = styled.span `
  position: relative;
  display: inline-block;
  margin-top: 10px;
`;

const InSearch = styled.input `
  width: 100%;
  padding: 3px 5px;
`;

const Genre = styled.select `
  cursor: pointer;
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

const Found = styled.span `
  display: inline-block;
  width: 145px;
  height: 42px;
  padding: 10px;
  border-radius: 5px;
  margin: 10px 0 0;
  background-color: #FF1151;
  font-size: 15px;
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
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${MY_API_KEY}`).then(res => res.json())
          .then(data => {
            setGenresLIst(data.genres);
          });
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
  const handleDiscover = () =>{
  
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${MY_API_KEY}&language=en-US&sort_by=${sort}&include_adult=false&page=1&year=${year}&with_genres=${genre}`).then(res => res.json())
        .then(data => {
          setDiscover(data.results);
          console.log(data)
        });
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
   </Card>
  
  );
};

export default BigFilter;