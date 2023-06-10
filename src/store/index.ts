import { configureStore, combineReducers } from "@reduxjs/toolkit";
import formSlice from "./formSlice";

const rootReducer = combineReducers({
	form: formSlice,
});

export type IRootState = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });
