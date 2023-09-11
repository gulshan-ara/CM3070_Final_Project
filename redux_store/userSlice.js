import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		userId: null,
		postList: [],
		userName: null,
		userEmail: null,
		allUsers: []
	},
	reducers: {
		userIdInfo: (state, action) => {
			const payload = action.payload;
			state.userId = payload.userId;
		},
		fetchingPostList: (state, action) => {
			const payload = action.payload;
			state.postList = payload.postListArray;
		},
		userNameInfo: (state, action) => {
			const payload = action.payload;
			state.userName = payload.userName;
		},
		userEmailInfo: (state, action) => {
			const payload = action.payload;
			state.userEmail = payload.userEmail;
		},
		fetchingUsersList: (state, action) => {
			const payload = action.payload;
			state.allUsers = payload.usersList;
		},
	},
});

export const userInfo = userSlice.actions.userIdInfo;
export const userPosts = userSlice.actions.fetchingPostList;
export const userNameInfo = userSlice.actions.userNameInfo;
export const userEmailInfo = userSlice.actions.userEmailInfo;
export const allUsersList = userSlice.actions.fetchingUsersList;
export default userSlice.reducer;
