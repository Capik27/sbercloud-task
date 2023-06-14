import * as yup from "yup";
import { getClearTextValue } from "utils/helpers/about";

const step3Shema = yup.object().shape({
	about: yup
		.string()
		.required("Расскажите немного о себе")
		.transform((value) => getClearTextValue(value))
		.max(200, "Не более 200 символов!"),
});

export default step3Shema;
