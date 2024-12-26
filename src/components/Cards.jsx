import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Cards = ({ data, trending, index,media_type }) => {
  const imageURL = useSelector((state) => state.filmaData.imageURL);
  const mediaType=data.media_type||media_type;
  return (
    <Link to={"/"+mediaType+"/"+data.id} className="h-full w-[250px] flex-shrink-0 relative rounded-lg block hover:scale-105 transition-all duration-300">
      {
        data?.poster_path ?(
          <img src={imageURL + data?.poster_path} alt="trending shows"  className="rounded-lg"/>
        ):(
          <div className="capitalize w-full h-full flex justify-center items-center bg-neutral-800">
            No image Found
          </div>
        )
      }
      
      <div className="absolute top-4">
        {trending && (
          <div className="text-xl py-1 px-3 font-semibold backdrop-blur-3xl bg-black/40 rounded-r-full overflow-hidden ">
            # {index} Trending
          </div>
        )}
      </div>
      <div className="absolute bottom-0 h-17 backdrop-blur-3xl bg-black/60 w-full p-2 overflow-hidden ">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
          {data?.title || data?.name}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p className="">
            {moment(data?.release_date).format("MMMM Do YYYY")}
          </p>
          <p className="bg-black  text-xs text-white rounded-full px-1 ">
            Rating : {Number(data.vote_average)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Cards;
