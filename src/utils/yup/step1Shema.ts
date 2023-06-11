//  "Введите ваш псевдоним",
//
// 	/^[a-zA-Zа-яА-Я0-9]{1,30}$/,
// 	"Не более 30 символов, без спецсимволов!",

import * as yup from "yup";

const phoneRegExp = /^\\+7\\s([1-9]\\d{3})\\s(\\d{3})-(\\d{2})-(\\d{2})$/;
const step1Shema = yup
	.object()
	.shape({
		phone: yup
			.string()
			.required("Введите ваш номер телефона")
			.matches(phoneRegExp, "Неверный формат почты!"),
		email: yup
			.string()
			.required("Введите вашу электронную почту")
			.email("Неверный формат номера!"),
	})
	.required();

export default step1Shema;
