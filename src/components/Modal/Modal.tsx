import style from "./Modal.module.scss";
import Button from "react-bootstrap/Button";

export type methodsType = {
	toMain: Function;
	close: Function;
};

type Props = {
	active?: boolean;
	type?: boolean;
	methods: methodsType;
};

export const Modal: React.FC<Props> = ({
	active = false,
	type = false,
	methods: { toMain, close },
}) => {
	if (!active) return null;

	const modalSuccess = (
		<>
			<h3 className={style.title}>Форма успешно отправлена</h3>
			<div className={style.circle_success} />
			<Button
				className={"button"}
				size="lg"
				type="button"
				id="button-to-main"
				onClick={() => toMain()}
			>
				На главную
			</Button>
		</>
	);

	const modalError = (
		<>
			<div className="w-100 d-flex justify-content-between align-items-center">
				<h3 className={style.title}>Ошибка</h3>
				<button className={style.circle_button} onClick={() => close()} />
			</div>
			<div className={style.circle_error} />
			<Button
				className={"button align-self-end"}
				size="lg"
				type="button"
				id="button-close"
				onClick={() => close()}
			>
				Закрыть
			</Button>
		</>
	);

	return (
		<div className={style.background}>
			<div className={style.popup}>{type ? modalSuccess : modalError}</div>
		</div>
	);
};
