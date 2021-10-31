import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { client } from "../../api/client";

const initialState = [];


export const fetchUsers=createAsyncThunk('users/fetchUsers',async ()=>{
  const res=await client.get('/fakeApi/users');
  console.log(res.data);
  return res.data;
})

const userSlice = createSlice({
  name: "users",
  reducers: {},
  initialState,
  extraReducers:(builder)=>{
    builder.addCase(fetchUsers.fulfilled,(state,payloadAction)=>{

      console.log(payloadAction.payload)
      state.push(payloadAction.payload);
    })
  }
});




export const selectUserById=(userId)=>{
 
  return({ users }) =>users.find((user) => user.id === userId)
}
export default userSlice.reducer;
