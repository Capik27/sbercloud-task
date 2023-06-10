import { Container } from "components/Container/Container";
import { Steps } from "components/Steps/Steps";

import { Step1 } from "pages/create/Step1";
import { Step2 } from "pages/create/Step2";
import { Step3 } from "pages/create/Step3";
import { useSelector } from "react-redux";
import { IRootState } from "store";

export function Create() {
	const step = useSelector((state: IRootState) => state.form.step);

	return (
		<Container>
			<Steps current={step} items={3} label />
			{!step && <Step1 />}
			{step === 1 && <Step2 />}
			{step === 2 && <Step3 />}
		</Container>
	);
}
