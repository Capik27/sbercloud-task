import { useStep } from "hooks/useStep";
import { useUserChange } from "hooks/useUserChange";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { BootstrapInput } from "components/BootstrapInput";
import { MAIN_ROUTE } from "routes/paths";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
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
		control,
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
		isValid && setStep(1);
	};

	const handleBack = (e: SyntheticEvent) => {
		e.preventDefault();
		const data = getValues();
		updStore(data);

		navigate(MAIN_ROUTE, { replace: true });
	};

	return (
		<Form
			className="mt-5 pt-4"
			onSubmit={handleSubmit(onSubmit)}
			autoComplete="off"
		>
			<Form.Group className="form">
				<Form.Group className="mb-4">
					<Form.Label htmlFor={"field-nickname"} className={"form__label"}>
						Nickname
					</Form.Label>
					<Form.Control
						{...register("nickname")}
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
					<Form.Label htmlFor={"field-name"} className={"form__label"}>
						Name
					</Form.Label>
					<Form.Control
						{...register("name")}
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
					<Form.Label htmlFor={"field-sername"} className={"form__label"}>
						Sername
					</Form.Label>
					<Form.Control
						{...register("sername")}
						type="sername"
						placeholder="Фамилия"
						className={"form__field"}
						id={"field-sername"}
					/>
					<span className="tip">
						{errors?.sername && String(errors?.sername?.message)}
					</span>
				</Form.Group>

				<Form.Group className="mb-4">
					<Form.Label htmlFor={"field-sex"} className={"form__label"}>
						Sex
					</Form.Label>
					<Controller
						name={"sex"}
						control={control}
						render={({ field }) => (
							<Select
								fullWidth
								size="small"
								{...field}
								input={<BootstrapInput />}
								id={"field-sex"}
							>
								<MenuItem value={"man"} id={"field-sex-option-man"}>
									man
								</MenuItem>
								<MenuItem value={"woman"} id={"field-sex-option-woman"}>
									woman
								</MenuItem>
							</Select>
						)}
					/>

					<span className="tip">
						{errors?.sex && String(errors?.sex?.message)}
					</span>
				</Form.Group>
			</Form.Group>

			<Form.Group className={"d-flex justify-content-between pt-5"}>
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
