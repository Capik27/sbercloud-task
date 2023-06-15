import { useRef, useEffect } from "react";
import style from "./Modal.module.scss";
import Button from "react-bootstrap/Button";

type Props = {
	show?: boolean; // show/hide modal
	type?: boolean; // success/error
	onClose: Function; // callback
	bgDisabled?: boolean; // if false - click on BG will activate closeCallback
	btnContent?: string;
};

const doNothing = () => {};

export const Modal: React.FC<Props> = ({
	show = false,
	type = false,
	onClose,
	bgDisabled = true,
	btnContent = "Закрыть",
}) => {
	const btnRef = useRef<any>();
	const handleClose = () => onClose();

	useEffect(() => {
		if (show) btnRef.current.focus();
	}, [show]);

	if (!show) return null;

	const modalSuccess = (
		<>
			<h3 className={style.title}>Форма успешно отправлена</h3>
			<div className={style.circle_success} />
			<Button
				className={"button"}
				size="lg"
				type="button"
				id="button-to-main"
				ref={btnRef}
				onClick={handleClose}
			>
				{btnContent}
			</Button>
		</>
	);

	const modalError = (
		<>
			<div className="w-100 d-flex justify-content-between align-items-center">
				<h3 className={style.title}>Ошибка</h3>
				<button className={style.circle_button} onClick={handleClose} />
			</div>
			<div className={style.circle_error} />
			<Button
				className={"button align-self-end"}
				size="lg"
				type="button"
				id="button-close"
				ref={btnRef}
				onClick={handleClose}
			>
				{btnContent}
			</Button>
		</>
	);

	return (
		<div
			className={style.background}
			onClick={bgDisabled ? doNothing : handleClose}
		>
			<div className={style.popup} onClick={(e) => e.stopPropagation()}>
				{type ? modalSuccess : modalError}
			</div>
		</div>
	);
};

//
