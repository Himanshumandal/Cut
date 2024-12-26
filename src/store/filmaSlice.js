import { createSlice } from "@reduxjs/toolkit";

const initialState={
    bannerData:[],
    imageURL:""
}

export const filmaSlice=createSlice({
    name:'filma',
    initialState,
    reducers:{
        setBannerData:(state,action)=>{
            state.bannerData=action.payload;
        },
        setImageURL:(state,action)=>{
            state.imageURL=action.payload;
        }
    }
});

export const {setBannerData,setImageURL}=filmaSlice.actions

export default filmaSlice.reducer

  