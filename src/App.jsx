
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileNavigation from './components/MobileNavigation'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setBannerData, setImageURL } from './store/filmaSlice'
import { use } from 'react'

function App() {
  const [theme,setTheme]=useState(localStorage.getItem("theme")||"dark");
  const dispatch=useDispatch();
  const fetchtrending=async()=>{
    try {
      const response= await axios.get("/trending/all/week")
      dispatch(setBannerData(response.data.results))
     // console.log(response.data.results);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const fetchConfig=async()=>{
    try {
      const resp=await axios.get('/configuration');
      dispatch(setImageURL(resp.data.images.secure_base_url+"original"));
      // console.log();
      
    } catch (error) {
      console.log(error);
      
    }
  }

  const toggletheme=()=>{
    const newtheme=theme=="light"? "dark" : "light";
    setTheme(newtheme);
    localStorage.setItem("theme",newtheme);

    document.documentElement.classList.remove('dark','light');
    document.documentElement.classList.add(newtheme);
  };

  useEffect(()=>{
    document.documentElement.classList.add(theme);
  },[theme])

  useEffect(()=>{
    fetchtrending();
    fetchConfig();
  },[])

  return (
    <main className='pb-14 lg:pb-0 bg-slate-600    dark:bg-gradient-to-r dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-transparent '>
      <Header theme={theme} toggletheme={toggletheme} />
      <div className='min-h-[90vh]'>
      <Outlet/>
      </div>
      <Footer/>
      <MobileNavigation/>
    </main>
  )
}

export default App
