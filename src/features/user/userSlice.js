import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "1", name: "주영" },
  { id: "2", name: "주민" },
  { id: "3", name: "주호" }
];

const userSlice = createSlice({
  name: "users",
  reducers: {},
  initialState
});

// export const {}=userSlice.actions;

export default userSlice.reducer;
