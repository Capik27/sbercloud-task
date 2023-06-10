import { useDispatch } from "react-redux";
import { setUserField } from "store/formSlice";

export const useUserChange = () => {
	const dispatch = useDispatch();
	return (key: string, value: string) => {
		dispatch(setUserField({ key, value }));
	};
};
