import * as yup from "yup";

const phoneRegExp = /[+]7\s[(][1-9]\d{2}[)]\s\d{3}-\d{2}-\d{2}/;
const emailRegExp = /^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+.[a-zA-Z]{2,}$/;

const mainShema = yup
	.object()
	.shape({
		phone: yup
			.string()
			.required("Введите ваш номер телефона")
			.length(18, "Слишком короткий номер!")
			.matches(phoneRegExp, "Неверный формат номера!"),
		email: yup
			.string()
			.required("Введите вашу электронную почту")
			.matches(emailRegExp, "Неверный формат почты!"),
	})
	.required();

export default mainShema;
