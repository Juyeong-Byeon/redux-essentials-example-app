const { createSlice, nanoid } = require("@reduxjs/toolkit");

const initialState = [
  // {
  //   id: "1",
  //   title: "first post",
  //   content: "hello world"
  // },
  // {
  //   id: "2",
  //   title: "second post",
  //   content: "hello world"
  // }
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
          id: nanoid().toString(),
          title,
          content
        }
      })
    },
    postUpdated: (state, payloadAction) => {
      const post = state.find((post) => post.id === payloadAction.payload.id);
      if (post) {
        post.title = payloadAction.payload.title;
        post.content = payloadAction.payload.content;
      }
    }
  }
});

export const { postAdded, postUpdated } = postSlice.actions;

export default postSlice.reducer;
