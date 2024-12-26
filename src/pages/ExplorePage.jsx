import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Cards from '../components/Cards';

const ExplorePage = () => {
  const [pageNo,setPageNo]=useState(1);
  const [data,setData]=useState([]);
  const [totalPages,setTotalPages]=useState(0);
  const params=useParams()
  console.log("param",params);

  const fetchData=async()=>{
    try {
      const response=await axios.get(`discover/${params.explore}`,{
        params:{
          page:pageNo
        }
      })
      setData((preve)=>{
        return [
          ...preve,
          ...response.data.results
        ]
      });
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log(error);
      
    }
  }

  const handlescroll=()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight){
      setPageNo(preve=>preve+1);
    }
  }
  

  useEffect(()=>{
    fetchData();
  },[pageNo]);

  useEffect(()=>{
    setPageNo(1);
    setData([])
    fetchData();
  },[params.explore])

  useEffect(()=>{
    window.addEventListener('scroll',handlescroll);
  },[]);
  
  return (
    <div className='pt-16'>
      <div className='container mx-auto'>
        <h3 className='text-xl font-semibold  text-center m-5 capitalize lg:text-2xl md:text-left '>
          Popular {params.explore} Shows
        </h3>
        <div className='grid grid-cols-[repeat(auto-fit,225px)] gap-9 justify-center lg:justify-start'>
          {
            data.map((exploreData,index)=>(
              <Cards data={exploreData} key={exploreData.id+"ExploreSection"} media_type={params.explore}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
