import * as yup from "yup";

const step2Shema = yup.object().shape({
	adv: yup.array().of(
		yup.object().shape({
			value: yup
				.string()
				.required("Введите что-нибудь")
				.max(30, "Не более 30 символов!"),
		})
	),
});

export default step2Shema;
