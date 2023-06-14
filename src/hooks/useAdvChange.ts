import { useDispatch } from "react-redux";
import { setAdvField } from "store/formSlice";

export const useAdvChange = () => {
	const dispatch = useDispatch();
	return (index: number, value: string) => {
		dispatch(setAdvField({ index, value }));
	};
};
