import { useStep } from "hooks/useStep";
import { useUserChange } from "hooks/useUserChange";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { MAIN_ROUTE } from "routes/paths";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import step1Shema from "utils/yup/step1Shema";

export function Step1() {
	const navigate = useNavigate();
	const setStep = useStep();
	const handleChange = useUserChange();
	const user = useSelector((state: any) => state.form.data.user);

	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors, isValid },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(step1Shema),
		defaultValues: {
			nickname: user.nickname ?? "",
			name: user.name ?? "",
			sername: user.sername ?? "",
			sex: user.sex ?? "",
		},
	});

	const updStore = (data: any) => {
		handleChange("nickname", data.nickname);
		handleChange("name", data.name);
		handleChange("sername", data.sername);
		handleChange("sex", data.sex);
	};

	const onSubmit = (data: any) => {
		updStore(data);
		if (isValid) setStep(1);
	};

	const handleBack = (e: SyntheticEvent) => {
		e.preventDefault();
		const data = getValues();
		updStore(data);

		navigate(MAIN_ROUTE);
	};

	return (
		<Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className="form">
				<Form.Group className="mb-4">
					<Form.Label className={"form__label"}>Nickname</Form.Label>
					<Form.Control
						{...register("nickname", {
							required: "Введите ваш псевдоним",
							pattern: {
								value: /^[a-zA-Zа-яА-Я0-9]{1,30}$/,
								message: "Не более 30 символов, без спецсимволов!",
							},
						})}
						autoComplete="off"
						type="text"
						placeholder="Псевдоним"
						className={"form__field"}
						id={"field-nickname"}
					/>
					<span className="tip">
						{errors?.nickname && String(errors?.nickname?.message)}
					</span>
				</Form.Group>

				<Form.Group className="mb-4">
					<Form.Label className={"form__label"}>Name</Form.Label>
					<Form.Control
						{...register("name", {
							required: "Введите ваше имя",
							pattern: {
								value: /^[a-zA-Zа-яА-Я]{1,50}$/,
								message: "Не более 50 символов, только буквы!",
							},
						})}
						autoComplete="off"
						type="text"
						placeholder="Имя"
						className={"form__field"}
						id={"field-name"}
					/>
					<span className="tip">
						{errors?.name && String(errors?.name?.message)}
					</span>
				</Form.Group>

				<Form.Group className="mb-4">
					<Form.Label className={"form__label"}>Sername</Form.Label>
					<Form.Control
						{...register("sername", {
							required: "Введите вашу фамилию",
							pattern: {
								value: /^[a-zA-Zа-яА-Я]{1,50}$/,
								message: "Не более 50 символов, только буквы!",
							},
						})}
						autoComplete="off"
						type="sername"
						placeholder="Фамилия"
						className={"form__field"}
						id={"field-sername"}
					/>
					<span className="tip">
						{errors?.sername && String(errors?.sername?.message)}
					</span>
				</Form.Group>

				<Form.Group>
					<Form.Label className={"form__label"}>Sex</Form.Label>
					<Form.Select
						{...register("sex", {
							required: "Выберите ваш пол",
						})}
						className={"form__field"}
						aria-label="Sex"
					>
						<option value="man" id={"field-sex-option-man"}>
							man
						</option>
						<option value="woman" id={"field-sex-option-woman"}>
							woman
						</option>
					</Form.Select>
					<span className="tip">
						{errors?.sex && String(errors?.sex?.message)}
					</span>
				</Form.Group>
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

				<Button className={"button"} size="lg" type="submit" id="button-next">
					Далее
				</Button>
			</Form.Group>
		</Form>
	);
}
