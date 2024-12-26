import React, { useEffect, useState } from 'react'
import Banner from '../components/Banner'
import Cards from '../components/Cards'
import { useSelector } from 'react-redux'
import HorizontalScroll from '../components/HorizontalScroll'
import Check from "../components/Check"
import useFetch from '../hooks/useFetch'

const Home = () => {
  const trending=useSelector((state)=>state.filmaData.bannerData)
  const {data:nowPlaying} =useFetch('/movie/now_playing')
  const {data:UpcomingMovies}=useFetch('/movie/upcoming')
  const {data:topRatedData}=useFetch('/movie/top_rated');
  const {data:PopularMovies}=useFetch('/movie/popular')
  const {data:TrendingTvShow}=useFetch('trending/tv/week')

  const {data:popularTvShow}=useFetch('/tv/popular');
  const {data:topRatedTvShow}=useFetch('/tv/top_rated')
  const {data:ontheAirData}=useFetch('/tv/on_the_air');
 
  return (
    <div>
      <Banner/>
      <HorizontalScroll data={trending} heading={"Trending Movies"} trending={true} media_type={"movie"}/>
      <HorizontalScroll data={nowPlaying} heading={"Now Playing"} media_type={"movie"}/>
      <HorizontalScroll data={UpcomingMovies} heading={"Upcoming Movies"} media_type={"movie"}/>
      <HorizontalScroll data={topRatedData} heading={"Top Rated Movies"} media_type={"movie"}/>
      <HorizontalScroll data={PopularMovies} heading={"Popular Movies"} media_type={"movie"}/>
      <HorizontalScroll data={TrendingTvShow} heading={"Trending TV Shows"} media_type={"tv"}/>
      <HorizontalScroll data={popularTvShow} heading={"Popular TV Show"} media_type={"tv"}/>
      <HorizontalScroll data={topRatedTvShow} heading={"Top Rated TV Show"} media_type={"tv"}/>
      <HorizontalScroll data={ontheAirData} heading={"On The Air"} media_type={"tv"}/>
      
     
    </div>
  )
}

export default Home
