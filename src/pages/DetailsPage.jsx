import React, { useEffect, useState } from "react";
import HorizontalScroll from "../components/HorizontalScroll.jsx"
import { useParams } from "react-router-dom";
import useFetchDetail from "../hooks/useFetchDetails";
import useFetch from "../hooks/useFetch"
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";
import Divider from "../components/Divider";
import VideoPlay from "../components/VideoPlay.jsx";
import { FaPlay } from "react-icons/fa6";



const DetailsPage = () => {

  const params = useParams();
  const imageURL = useSelector((state) => state.filmaData.imageURL);
  const { data,refetch} = useFetchDetail(`/${params?.explore}/${params?.id}`);
  const { data: castData,refetch: refetchCast } = useFetchDetail(
    `/${params?.explore}/${params?.id}/credits`
  );
  const {data:similarData,refetch: refetchSimilar}=useFetch(`/${params?.explore}/${params?.id}/similar`)
  const {data:RecommandData,refetch: refetchRecommand}=useFetch(`/${params?.explore}/${params?.id}/recommendations`)
  const[videoPlay,setVideoPlay]=useState(false);
  const [playVideoId,setPlayVideoId]=useState("");

  const runtime = data?.runtime || 0; // Default to 0 if runtime is undefined
  const duration =
    runtime > 0
      ? `${Math.floor(runtime / 60)}h ${runtime % 60}m`
      : "Not Available";
  const writer=castData?.crew?.filter(el=>el?.department==="Writing")?.map(el=>el?.name).join(",") || "Not found";

  useEffect(() => {
    refetch(`/${params?.explore}/${params?.id}`);
    refetchCast(`/${params?.explore}/${params?.id}/credits`);
    refetchSimilar(`/${params?.explore}/${params?.id}/similar`);
    refetchRecommand(`/${params?.explore}/${params?.id}/recommendations`);
  }, [params, refetch, refetchCast, refetchSimilar,refetchRecommand]);

  const handlePlay=(data)=>{
    setPlayVideoId(data)
    setVideoPlay(true);
  }

  //console.log(similarData);
  



  return (
    <div className="">
      <div className="w-full h-[400px] relative hidden lg:block">
        <div className="w-full h-full">
          <img
            src={imageURL + data?.backdrop_path}
            alt=""
            className="h-full w-full object-cover"
          />
          
        </div>
        
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/50 to-transparent"></div>
      </div>
      <div className="container mx-auto py-20 flex flex-col lg:py-1 lg:flex-row lg:gap-20">
        <div className="mx-auto w-fit relative lg:-mt-40 lg:mx-0 text-center transition-opacity group-hover:opacity-80 ">

        

         <img
            src={imageURL + data?.poster_path}
            alt=""
            className=" h-80 w-80 lg:h-[400px] lg:w-[700px] object-cover rounded-md  "
          />
        
          <button className=" absolute
          text-6xl text-neutral-500 
          flex items-center justify-center top-32 left-0 right-0 
          lg:top-44
          hover:scale-105  transition-all  "
          onClick={()=>handlePlay(data)}
          >
            <FaPlay/>
          </button>
        </div>
        <div className="my-4 mx-2">
          <h2 className="text-4xl font-bold text-white lg:text-6xl">{data?.title||data?.name}</h2>
          
          <Divider/>

          <div className="flex items-center text-neutral-300 py-2 text-lg gap-3 text-center">
            <p>Rating : {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p>Views : {Number(data?.vote_count)}</p>
            <span>|</span>
            <p className="">Duration : {duration}</p>
          </div>

          <div>
             <h3 className="text-2xl font-bold text-white mb-1">Overview</h3>
             <p>{data?.overview}</p>

             

             <div className="my-2 flex items-center gap-3 text-center">
              
              <p>Status : {data?.status}</p>
              <span>|</span>
              <p>Release Date : {moment(data?.release_date).format("MMMM Do YYYY")}</p>
              <span>|</span>
              <p>
                Revenue : {Number(data?.revenue)}
              </p>
             </div>

             <Divider/>

          </div>
          <div>
            <p>Director : {castData?.crew[0]?.name}</p>
            <Divider/>
            <p>
              <span>Writer : {writer} </span>
            </p>
            <Divider/>
          </div>
          <h2 className="font-bold text-lg tracking-normal mb-6">Cast :</h2>
          <div className="grid grid-cols-[repeat(auto-fit,110px)] gap-4 lg:gap-8">
            {
              castData?.cast?.filter(el=>el?.profile_path)?.map((star,index)=>(
                <div>
                  <div>
                    <img src={imageURL+star?.profile_path} alt="" className="h-28 w-28 object-cover rounded-full" />
                  </div>
                  <p className="font-bold text-neutral-600 text-center text-md">{star?.name}</p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      
      <div>
      <HorizontalScroll data={similarData} heading={"Similar "+params?.explore} media_type={params?.explore}/>
      <HorizontalScroll data={RecommandData} heading={"Recommand "+params?.explore} media_type={params?.explore}/>
      </div>
      {
        videoPlay && (
          <VideoPlay data={playVideoId} close={()=>setVideoPlay(false)} media_type={params?.explore}/>
        )
      }
    </div>
  );
};

export default DetailsPage;
