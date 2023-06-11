import { useStep } from "hooks/useStep";
import { useUserChange } from "hooks/useUserChange";
import { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { SyntheticEvent } from "react";
import { Modal, methodsType } from "components/Modal/Modal";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "routes/paths";
import { resetStore } from "store/formSlice";
import { ENDPOINT } from "utils/links";

const MAX_LENGTH_AREA = 200;

export function Step3() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const setStep = useStep();
	const handleChange = useUserChange();
	const infodata = useSelector((state: any) => state.form.data);
	const about = useSelector((state: any) => state.form.data.user.about);
	const [isModal, setIsModal] = useState(false);
	const modalType = useRef(false);

	const getSymbCount = (data: string) => data.split(" ").join("").length;

	const {
		register,
		handleSubmit,
		getValues,
		watch,
		formState: { errors, isValid },
	} = useForm({
		mode: "onBlur",
		defaultValues: {
			about,
		},
	});

	watch("about");
	const symbolsCounter = useRef(getSymbCount(about));

	useEffect(() => {
		const subscription = watch(
			(data) => (symbolsCounter.current = getSymbCount(data.about))
		);
		return () => subscription.unsubscribe();
	}, [watch]);

	const fetchForm = async () => {
		const body = JSON.parse(JSON.stringify(infodata));
		console.log("BODY", body);
		body.user.about = getValues().about;
		const resp = await fetch(ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify(body),
		});

		// console.log("resp", resp);

		if (resp.ok) modalType.current = true;
		setIsModal(true);
	};

	const modalMethods: methodsType = {
		toMain() {
			// dispatch(resetStore());
			setStep(0);
			navigate(MAIN_ROUTE);
		},
		close() {
			setIsModal(false);
		},
	};

	const handleBack = (e: SyntheticEvent) => {
		e.preventDefault();
		handleChange("about", getValues().about);
		setStep(1);
	};

	const onSubmit = (data: any) => {
		// console.log("data.about", data.about);
		// handleChange("about", data.about);
		if (isValid) {
			fetchForm();
		}
	};

	// console.log("RENDER 3");

	return (
		<Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className="mb-4">
				<Form.Label className={"form__label"}>About</Form.Label>
				<div className="position-relative">
					<Form.Control
						{...register("about", {
							required: "Введите информацию о себе",
							maxLength: {
								value: MAX_LENGTH_AREA,
								message: "Слишком много символов!",
							},
						})}
						autoComplete="off"
						// maxLength={MAX_LENGTH_AREA}
						style={{ height: "85px" }}
						id={"field-about"}
						as="textarea"
						placeholder="Some text..."
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

			<Form.Group className={"d-flex justify-content-between pt-5 mt-5"}>
				<Button
					className={"button-outlined"}
					variant="outline-primary"
					size="lg"
					type="button"
					id="button-back"
					onClick={handleBack}
				>
					Назад
				</Button>

				<Button className={"button"} size="lg" type="submit" id="button-send">
					Отправить
				</Button>
			</Form.Group>

			<Modal active={isModal} type={modalType.current} methods={modalMethods} />
		</Form>
	);
}
