import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  outdate:null,
}

export const outdateSlice = createSlice({
  name: 'outdate',
  initialState,
  reducers: {
    setOutdate:(state,action)=>{
        state.access_token = action.payload.outdate
    },
    unsetOutdate:(state,action)=>{
        state.access_token = action.payload.outdate
    },
  },
})

export const { setOutdate,unsetOutdate } = outdateSlice.actions

export default outdateSlice.reducer