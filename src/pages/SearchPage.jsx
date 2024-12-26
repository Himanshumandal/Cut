import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Cards from '../components/Cards';

const SearchPage = () => {
  const location=useLocation();
  const [data,setData]=useState([]);
  const [page,setPage]=useState(1)
  const navigation=useNavigate();

  const query=location?.search?.slice(3);

  const fetchData=async()=>{
    try {
      const response=await axios.get('/search/multi',{
        params:{
          query:location?.search?.slice(3),
          page:page,
        }
      })
      setData((preve)=>{
        return [
          ...preve,
          ...response.data.results
        ]
      })
    } catch (error) {
      console.log("error",error);
      
    }
  }

  const handlescroll=()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight){
      setPage(preve=>preve+1);
    }
  }

   useEffect(()=>{
    if(query)
    {
      fetchData();

    }
    },[page]);


  useEffect(()=>{
    if(query)
    {
    fetchData();
    setData([]);
    setPage(1);
    }
  },[location?.search])

  useEffect(()=>{
      window.addEventListener('scroll',handlescroll);
    },[]);

  console.log("location",location.search.slice(3));
  
  return (
    <div className='pt-16'>
      <div className='container mx-auto lg:hidden my-3 sticky top-[70px] z-30'>
        <input type="text" placeholder='Search...'
        onChange={(e)=>navigation(`/search?q=${e.target.value}`)}
        value={query?.split("%20").join(" ")}
        className='px-4 py-1 text-lg font-semibold bg-white rounded-full text-neutral-900'
        />
      </div>
      <div className='container mx-auto'>
        <h3 className='text-xl font-semibold my-3 capitalize lg:text-2xl '>
          Search Results
        </h3>
        <div className='grid grid-cols-[repeat(auto-fit,225px)] gap-9 justify-center lg:justify-start'>
          {
            data.map((searchData,index)=>(
              <Cards data={searchData} key={searchData.id+"SearchData"} media_type={searchData.media_type}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SearchPage
