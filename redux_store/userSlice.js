import { createSlice } from "@reduxjs/toolkit";

// global store to store user states
const userSlice = createSlice({
	name: "user",
	// initial states
	initialState: {
		userId: null,
		postList: [],
		userName: null,
		userEmail: null,
		allUsers: [],
		hairObj: null,
	},

	// functions to update the states
	reducers: {
		// updates userId
		userIdInfo: (state, action) => {
			const payload = action.payload;
			state.userId = payload.userId;
		},
		// updates post list of user
		fetchingPostList: (state, action) => {
			const payload = action.payload;
			state.postList = payload.postListArray;
		},
		// updates user name
		userNameInfo: (state, action) => {
			const payload = action.payload;
			state.userName = payload.userName;
		},
		// updates user email
		userEmailInfo: (state, action) => {
			const payload = action.payload;
			state.userEmail = payload.userEmail;
		},
		// updates other users list
		fetchingUsersList: (state, action) => {
			const payload = action.payload;
			state.allUsers = payload.usersList;
		},
		// update hair node
		updateHairObj: (state, action) => {
			const payload = action.payload;
			state.hairObj = payload.hairObject;
		},
	},
});

// exports all reducers
export const userInfo = userSlice.actions.userIdInfo;
export const userPosts = userSlice.actions.fetchingPostList;
export const userNameInfo = userSlice.actions.userNameInfo;
export const userEmailInfo = userSlice.actions.userEmailInfo;
export const allUsersList = userSlice.actions.fetchingUsersList;
export const updateHairObj = userSlice.actions.updateHairObj;
export default userSlice.reducer;
