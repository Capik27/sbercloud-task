import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isregpage: false,
	isinside: false,
};

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		setRegPageTrueAction(state) {
			state.isregpage = true;
		},
		setRegPageFalseAction(state) {
			state.isregpage = false;
		},
		setRegPageToggleAction(state) {
			state.isregpage = !state.isregpage;
		},
		//////
		setInsideTrueAction(state) {
			state.isinside = true;
		},
		setInsideFalseAction(state) {
			state.isinside = false;
		},
	},
});

export default formSlice.reducer;
export const {
	setRegPageTrueAction,
	setRegPageFalseAction,
	setRegPageToggleAction,
	setInsideTrueAction,
	setInsideFalseAction,
} = formSlice.actions;
