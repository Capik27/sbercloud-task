import { useDispatch } from "react-redux";
import { setRadioField } from "store/formSlice";

export const useRadioChange = () => {
	const dispatch = useDispatch();
	return (index: number) => {
		dispatch(setRadioField(+index));
	};
};
