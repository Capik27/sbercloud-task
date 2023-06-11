import { createSlice } from "@reduxjs/toolkit";

export type advType = {
	value?: string;
	checked?: boolean;
	radio?: boolean;
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
			email: "",
			phone: "",
			about: "",
		},
		adv: [
			{ value: "1", checked: false, radio: false },
			{ value: "2", checked: false, radio: false },
			{ value: "3", checked: false, radio: false },
		],
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
			console.log("user change", key, value);
			state.data.user[key] = value;
		},
		setAdvField(state, action) {
			const { index, key, value } = action.payload;
			// if (key === "radio") console.log("radio change state", action.payload);
			state.data.adv[index][key] = value;
		},
		addInput(state) {
			state.data.adv.push({ value: "", checked: false, radio: false });
		},
		deleteInput(state, action) {
			// console.log("delete index", action.payload);
			state.data.adv = state.data.adv.filter(
				(_: any, index: number) => index !== action.payload
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
	setUserField,
	resetStore,
} = formSlice.actions;
