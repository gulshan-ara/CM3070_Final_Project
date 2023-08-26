import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
      userId: null
  },
  reducers: {
      userInfo: (state, action) => {
          const payload = action.payload;
          state.userId = payload.userId;
          console.log(state);
      }
  }
});

export const userInfo = userSlice.actions.userInfo;
export default userSlice.reducer;