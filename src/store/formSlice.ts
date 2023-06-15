import { createSlice } from "@reduxjs/toolkit";

export type advType = {
	value: string;
};

type sliceType = {
	step: number;
	data: any;
};

const initialState: sliceType = {
	step: 0,
	data: {
		user: {
			nickname: "",
			name: "",
			sername: "",
			sex: "",
			email: "ShikhovKS@gmail.com",
			phone: "89226606542",
			about: "",
		},
		advantages: ["", "", ""],
		checkbox: [0, 0, 0],
		radio: null,
	},
};

const formSlice = createSlice({
	name: "form",
	initialState,
	reducers: {
		resetStore() {
			return initialState;
		},
		setStep(state, action) {
			state.step = action.payload;
		},
		setUserField(state, action) {
			const { key, value } = action.payload;
			state.data.user[key] = value;
		},
		setAdvField(state, action) {
			const { index, value } = action.payload;
			state.data.advantages[index] = value;
		},
		setCheckboxField(state, action) {
			const { index, value } = action.payload;
			state.data.checkbox[index] = +value;
		},
		setRadioField(state, action) {
			state.data.radio = action.payload;
		},
		addInput(state) {
			state.data.advantages.push("");
		},
		deleteInput(state, action) {
			state.data.advantages = state.data.advantages.filter(
				(_: string, index: number) => index !== action.payload
			);
		},
	},
});

export default formSlice.reducer;
export const {
	setStep,
	addInput,
	deleteInput,
	setAdvField,
	setCheckboxField,
	setRadioField,
	setUserField,
	resetStore,
} = formSlice.actions;
