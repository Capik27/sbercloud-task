import { useDispatch } from "react-redux";
import { setCheckboxField } from "store/formSlice";

export const useCheckboxChange = () => {
	const dispatch = useDispatch();
	return (index: number, value: number | boolean) => {
		dispatch(setCheckboxField({ index, value }));
	};
};
