import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		userId: null,
	},
	reducers: {
		userIdInfo: (state, action) => {
			const payload = action.payload;
			state.userId = payload.userId;
		},
	},
});

export const userInfo = userSlice.actions.userIdInfo;
export default userSlice.reducer;
