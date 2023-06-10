import { useDispatch } from "react-redux";
import { addInput, deleteInput } from "store/formSlice";

type actionType = "add" | "delete";

export const useInputAction = () => {
	const dispatch = useDispatch();
	return (type: actionType, del_Index?: number) => {
		switch (type) {
			case "add":
				dispatch(addInput());
				break;
			case "delete":
				dispatch(deleteInput(del_Index));
				break;
			default:
				return;
		}
	};
};
