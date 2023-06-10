import { useDispatch } from "react-redux";
import { setAdvField } from "store/formSlice";

export const useAdvChange = () => {
	const dispatch = useDispatch();
	return (index: number, key: string, value: number | string | boolean) => {
		dispatch(setAdvField({ index, key, value }));
	};
};
