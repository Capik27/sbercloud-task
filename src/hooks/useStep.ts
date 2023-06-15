import { useDispatch } from "react-redux";
import { setStep } from "store/formSlice";

export const useStep = () => {
	const dispatch = useDispatch();
	return (int: number) => {
		dispatch(setStep(int));
	};
};
