import React from 'react'
import { IoClose } from 'react-icons/io5'
import useFetchDetail from '../hooks/useFetchDetails'

const VideoPlay = ({data,close,media_type}) => {
    const{data:videoData,refetch:refechvideo}=useFetchDetail(`${media_type}/${data?.id}/videos`)
    // console.log(videoData);  
    
  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-opacity-50 z-40 flex justify-center items-center m-10'>
        <div className='bg-black/40 w-full h-[80vh] max-w-screen-lg aspect-video rounded-md relative'>
        <button onClick={close} className='absolute -right-4 -top-4 text-5xl bg-red-600 rounded-md hover:scale-90 transition-all'> <IoClose/> </button>
        <iframe src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`} frameborder="0"
        className='w-full h-full'
        ></iframe>
        </div>
    </section>
  )
}

export default VideoPlay
