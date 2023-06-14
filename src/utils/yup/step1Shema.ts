import * as yup from "yup";

const nicknameRegExp = /^[a-zA-Zа-яА-Я0-9]{1,30}$/;
const nameRegExp = /^[a-zA-Zа-яА-Я]{1,50}$/;

const step1Shema = yup
	.object()
	.shape({
		nickname: yup
			.string()
			.required("Введите ваш псевдоним")
			.max(30, "Превышен лимит в 30 символов!")
			.matches(nicknameRegExp, "Без спецсимволов!"),
		name: yup
			.string()
			.required("Введите ваше имя")
			.max(50, "Не более 50 символов!")
			.matches(nameRegExp, "Допустимы только буквы!"),
		sername: yup
			.string()
			.required("Введите вашу фамилию")
			.max(50, "Не более 50 символов!")
			.matches(nameRegExp, "Допустимы только буквы!"),
		sex: yup.string().required("Выберите ваш пол"),
	})
	.required();

export default step1Shema;
