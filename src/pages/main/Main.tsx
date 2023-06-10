import { Container } from "components/Container/Container";
import { useUserChange } from "hooks/useUserChange";
import style from "./Main.module.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { tg, gh, hh } from "utils/links";
import { CREATE_ROUTE } from "routes/paths";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export function Main() {
	const navigate = useNavigate();
	const handleChange = useUserChange();
	const user = useSelector((state: any) => state.form.data.user);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		mode: "onBlur",
		defaultValues: {
			phone: user.phone ?? "",
			email: user.email ?? "",
		},
	});

	const onSubmit = (data: any) => {
		handleChange("phone", data.phone);
		handleChange("email", data.email);

		if (isValid) navigate(CREATE_ROUTE);
	};

	return (
		<Container smallPadding>
			<div className={style.user}>
				<div className={style.user__avatar}>КС</div>
				<div className={style.column}>
					<h3 className={style.user__name}>Шихов Константин</h3>
					<div className={style.user__contacts}>
						<Button
							variant="link"
							className={style.user__btn}
							target={"_blank"}
							href={tg}
						>
							Telegram
						</Button>
						<Button
							variant="link"
							className={style.user__btn}
							target={"_blank"}
							href={gh}
						>
							GitHub
						</Button>
						<Button
							variant="link"
							className={style.user__btn}
							target={"_blank"}
							href={hh}
						>
							Resume
						</Button>
					</div>
				</div>
			</div>
			<hr className={style.hr} />
			<Form className={style.form} onSubmit={handleSubmit(onSubmit)}>
				<Form.Group className="mb-3">
					<Form.Label className={style.form__label}>Номер телефона</Form.Label>
					<Form.Control
						{...register("phone", {
							required: "Введите ваш номер телефона",
							pattern: {
								value: /^((\+7)+([0-9]){10})$/,
								message: "Неверный формат номера!",
							},
						})}
						autoComplete="off"
						type="tel"
						placeholder="+7 900 000-00-00"
						className={style.form__field}
					/>
					<span className="tip">
						{errors?.phone && String(errors?.phone?.message)}
					</span>
				</Form.Group>

				<Form.Group className="mb-5">
					<Form.Label className={style.form__label}>Email</Form.Label>
					<Form.Control
						{...register("email", {
							required: "Введите вашу электоронную почту",
							pattern: {
								value: /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+.[a-zA-Z]{2,}$/,
								message: "Неверный формат почты!",
							},
						})}
						autoComplete="off"
						type="email"
						placeholder="shikhovks@example.com"
						className={style.form__field}
					/>
					<span className="tip">
						{errors?.email && String(errors?.email?.message)}
					</span>
				</Form.Group>

				<Button className={"button"} size="lg" type="submit" id="button-start">
					Начать
				</Button>
			</Form>
		</Container>
	);
}
