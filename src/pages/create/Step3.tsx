import { useStep } from "hooks/useStep";
import { useUserChange } from "hooks/useUserChange";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { SyntheticEvent } from "react";
import { Modal } from "components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "routes/paths";
import { resetStore } from "store/formSlice";
import { ENDPOINT } from "utils/links";
import { yupResolver } from "@hookform/resolvers/yup";
import step3Shema from "utils/yup/step3Shema";
import { getClearTextValue } from "utils/validation/about";

const MAX_LENGTH_AREA = 200;

export function Step3() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const setStep = useStep();
	const handleChange = useUserChange();
	const infodata = useSelector((state: any) => state.form.data);
	const about = useSelector((state: any) => state.form.data.user.about);
	const [isModal, setIsModal] = useState<boolean>(false);
	const modalType = useRef<boolean>(false);

	const {
		register,
		handleSubmit,
		getValues,
		watch,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
		resolver: yupResolver(step3Shema),
		defaultValues: {
			about,
		},
	});

	watch("about");
	const symbolsCounter = useRef(getClearTextValue(about).length);

	useEffect(() => {
		const subscription = watch(
			(data) => (symbolsCounter.current = getClearTextValue(data?.about).length)
		);
		return () => subscription.unsubscribe();
	}, [watch]);

	const fetchForm = async () => {
		const body = JSON.parse(JSON.stringify(infodata));
		body.user.about = getClearTextValue(getValues().about);

		const resp = await fetch(ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(body),
		});

		if (resp.ok) modalType.current = true;
		setIsModal(true);
	};

	const handleAutoEditing = (e: SyntheticEvent) => {
		const target = e.target as HTMLTextAreaElement;
		target.value = getClearTextValue(target.value);
	};

	const handleBack = (e: SyntheticEvent) => {
		e.preventDefault();
		handleChange("about", getValues().about);
		setStep(1);
	};

	const onSubmit = () => {
		isValid && fetchForm();
	};

	// MODAL CALLBACKS
	function successCallback() {
		dispatch(resetStore());
		setStep(0);
		navigate(MAIN_ROUTE);
	}
	function errorCallback() {
		setIsModal(false);
	}

	return (
		<Form
			className="mt-5 pt-4"
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Form.Group className="mb-4">
				<Form.Label className={"form__label"}>About</Form.Label>
				<div className="position-relative">
					<Form.Control
						{...register("about")}
						className={"form__textarea"}
						id={"field-about"}
						as="textarea"
						placeholder="Some text..."
						disabled={isModal}
						onBlur={handleAutoEditing}
					/>
					{symbolsCounter.current > 0 && (
						<div className="scounter">
							{symbolsCounter.current}/{MAX_LENGTH_AREA}
						</div>
					)}
				</div>
				<span className="tip">
					{errors?.about && String(errors?.about?.message)}
				</span>
			</Form.Group>

			<Form.Group className={"d-flex justify-content-between pt-5"}>
				<Button
					className={"button-outlined"}
					variant="outline-primary"
					size="lg"
					type="button"
					id="button-back"
					disabled={isModal}
					onClick={handleBack}
				>
					Назад
				</Button>

				<Button
					disabled={isModal}
					className={"button"}
					size="lg"
					type="submit"
					id="button-send"
				>
					Отправить
				</Button>
			</Form.Group>

			{isModal && (
				<Modal
					type={modalType.current}
					onClose={modalType.current ? successCallback : errorCallback}
					btnContent={modalType.current ? "На главную" : "Закрыть"}
				/>
			)}
		</Form>
	);
}
