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
import { yupResolver } from "@hookform/resolvers/yup";
import mainShema from "utils/yup/mainShema";
import { telChange, telPaste } from "utils/validation/phone";

export function Main() {
	const navigate = useNavigate();
	const handleChange = useUserChange();
	const user = useSelector((state: any) => state.form.data.user);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(mainShema),
		defaultValues: {
			phone: user.phone ?? "",
			email: user.email ?? "",
		},
	});

	const onSubmit = (data: any) => {
		handleChange("phone", data.phone);
		handleChange("email", data.email);
		navigate(CREATE_ROUTE);
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
			<Form
				className={style.form}
				onSubmit={handleSubmit(onSubmit)}
				autoComplete="off"
			>
				<Form.Group>
					<Form.Label className={style.form__label}>Номер телефона</Form.Label>

					<Form.Control
						{...register("phone")}
						onPaste={telPaste}
						onChange={telChange}
						type="tel"
						placeholder="+7 (900) 000-00-00"
						className={style.form__field}
					/>
					<span className="tip">
						{errors?.phone && String(errors?.phone?.message)}
					</span>
				</Form.Group>
				<Form.Group>
					<Form.Label className={style.form__label}>Email</Form.Label>
					<Form.Control
						{...register("email")}
						type="text"
						placeholder="example@example.com"
						className={style.form__field}
					/>
					<span className="tip">
						{errors?.email && String(errors?.email?.message)}
					</span>
				</Form.Group>

				<Button
					className={"button mt-4"}
					size="lg"
					type="submit"
					id="button-start"
				>
					Начать
				</Button>
			</Form>
		</Container>
	);
}
