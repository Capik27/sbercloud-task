import { Container } from "components/Container/Container";
import { Steps } from "components/Steps/Steps";
import { Step1 } from "pages/create/Step1";
import { Step2 } from "pages/create/Step2";
import { Step3 } from "pages/create/Step3";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "routes/paths";
import { IRootState } from "store";

export function Create() {
	const step = useSelector((state: IRootState) => state.form.step);
	const user = useSelector((state: any) => state.form.data.user);
	const navigate = useNavigate();

	useEffect(() => {
		if (!user.email || !user.phone) {
			navigate(MAIN_ROUTE, { replace: true });
		}
	}, []);

	return (
		<Container>
			<Steps current={step} items={3} label />
			{!step && <Step1 />}
			{step === 1 && <Step2 />}
			{step === 2 && <Step3 />}
		</Container>
	);
}
