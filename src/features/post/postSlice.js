import { createAsyncThunk, createSlice, nanoid, } from "@reduxjs/toolkit"

import {client} from '../../api/client';

const initialState = {
  status: 'idle',
  error: null,
  posts:[]
};

const fetchPosts=createAsyncThunk('posts/fetchPosts',async ()=>{
  const res=await client.get('/fakeApi/posts');
  return res.data
})

export const addNewPost=createAsyncThunk('posts/addNewPost',async (initialPost)=>{
    const response= await client.post('/fakeApi/posts',initialPost);

    return response;
})



const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, payloadAction) => {
        state.posts.push(payloadAction.payload);
      },
      prepare: (user, title, content) => ({
        payload: {
          user,
          date:new Date().toISOString(),
          id: nanoid().toString(),
          title,
          content,
          reactions:{
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0
          }
        }
      })
    },
    postUpdated: (state, payloadAction) => {
      const post = state.posts.find((post) => post.id === payloadAction.payload.id);
      if (post) {
        post.title = payloadAction.payload.title;
        post.content = payloadAction.payload.content;
      }
    },
    reactionAdded:(state,payloadAction)=>{
      const {postId,reaction}=payloadAction.payload;
      const existingPost=state.posts.find((post)=>post.id===postId);

      if(existingPost)existingPost.reactions[reaction]++;

    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(fetchPosts.pending,(state,payloadAction)=>{
      state.status='loading'
    })
    .addCase(fetchPosts.fulfilled,(state,payloadAction)=>{
      state.status='succeeded'
      state.posts=[...state.posts,...payloadAction.payload];
    })
    .addCase(fetchPosts.rejected,(state,payloadAction)=>{
      state.status='failed';
      state.error=payloadAction.error.message;
    }).addCase(addNewPost.fulfilled,(state,action)=>{
      state.posts.push(action.payload);
    })
  }
});



const asyncPostAdd=(post)=>{
  return (dispatch)=>{
    setTimeout(()=>dispatch(postUpdated(post)),1000)
  }
}

const selectAllPosts=({ posts }) => posts.posts;
const selectPostById=(postId)=>({ posts }) =>posts.posts.find((post) => post.id === postId);



export const { postAdded, postUpdated,reactionAdded} = postSlice.actions;

export {asyncPostAdd,selectAllPosts,selectPostById,fetchPosts};

export default postSlice.reducer;
