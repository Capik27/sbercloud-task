import { Modal } from "components/Modal/Modal";
import { useStep } from "hooks/useStep";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "routes/paths";

export function Error() {
	const setStep = useStep();
	const navigate = useNavigate();

	function goToMain() {
		setStep(0);
		navigate(MAIN_ROUTE, { replace: true });
	}

	return <Modal onClose={goToMain} btnContent={"Вернуться на главную"} />;
}
