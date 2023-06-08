import { Container } from "components/Container/Container";
import style from "./Main.module.scss";

export function Main() {
	return (
		<Container smallPadding>
			<div className={style.name}>Шихов Константин</div>
		</Container>
	);
}
