const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = [
//
];

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, payloadAction) => {
        state.push(payloadAction.payload);
      },
      prepare: (userId, title, content) => ({
        payload: {
          userId,
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
      const post = state.find((post) => post.id === payloadAction.payload.id);
      if (post) {
        post.title = payloadAction.payload.title;
        post.content = payloadAction.payload.content;
      }
    },
    reactionAdded:(state,payloadAction)=>{
      const {postId,reaction}=payloadAction.payload;
      const existingPost=state.find((post)=>post.id===postId);

      if(existingPost)existingPost.reactions[reaction]++;

    }
  }
});

export const { postAdded, postUpdated,reactionAdded } = postSlice.actions;

export default postSlice.reducer;
