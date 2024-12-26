import { useEffect, useState } from "react";
import axios from "axios";

const useFetchDetail=(endpoint)=>{
    const[url,setUrl]=useState(endpoint)
    const [data,setData]=useState();
    const [loading,setLoadig]=useState(false);

    const fetchData=async()=>{
        try {
            setLoadig(true);
          const resp=await axios.get(url);
           setLoadig(false);
          setData(resp.data);
          // console.log(resp.data.results);
          
        } catch (error) {
          console.log(error);
          
        }
      }

      useEffect(()=>{
        if(url) fetchData();
      },[url])

      const refetch=(newUrl)=>{
        if(newUrl) setUrl(newUrl)
        else fetchData();
      };

    return{data,loading,refetch}
}

export default useFetchDetail;