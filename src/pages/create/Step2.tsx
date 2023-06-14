import { useAdvChange } from "hooks/useAdvChange";
import { useInputAction } from "hooks/useInputAction";
import { useRadioChange } from "hooks/useRadioChange";
import { useCheckboxChange } from "hooks/useCheckboxChange";
import { useStep } from "hooks/useStep";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { advType } from "store/formSlice";
import { useForm, useFieldArray } from "react-hook-form";
import { SyntheticEvent, useEffect } from "react";
import step2Shema from "utils/yup/step2Shema";
import { yupResolver } from "@hookform/resolvers/yup";

type ItemType = {
	value: string | number | boolean;
};

export function Step2() {
	const setStep = useStep();
	const setRadio = useRadioChange();
	const setCheckbox = useCheckboxChange();
	const setAdvChange = useAdvChange();
	const handleInputAct = useInputAction();

	const inputFields: advType[] = useSelector(
		(state: any) => state.form.data.advantages
	);
	const checkboxFields: number[] = useSelector(
		(state: any) => state.form.data.checkbox
	);
	const radioValue: number = useSelector((state: any) => state.form.data.radio);

	const returnFormattedObj = () => {
		const obj: any = { adv: [], checkbox: [], radio: String(radioValue) };
		inputFields.forEach((value: advType) => {
			obj.adv.push({ value });
		});
		checkboxFields.forEach((value: number) => {
			obj.checkbox.push({ value });
		});
		return obj;
	};

	const defaultValues = returnFormattedObj();

	const {
		register,
		handleSubmit,
		getValues,
		control,
		formState: { errors },
	} = useForm({
		mode: "onBlur",
		resolver: yupResolver(step2Shema),
		defaultValues,
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "adv",
	});

	const updStore = () => {
		const data: any = getValues();
		setRadio(data.radio);
		data.checkbox.forEach(({ value }: ItemType, index: number) =>
			setCheckbox(index, +value)
		);
		data.adv.forEach(({ value }: ItemType, index: number) =>
			setAdvChange(index, String(value))
		);
	};

	const onSubmit = () => {
		updStore();
		setStep(2);
	};

	const handleBack = (e: SyntheticEvent) => {
		e.preventDefault();
		updStore();
		setStep(0);
	};

	const handleAddAction = () => {
		const newInput: ItemType = { value: "" };
		append(newInput);
		handleInputAct("add");
	};

	const handleDeleteAction = (index: number) => {
		remove(index);
		handleInputAct("delete", index);
	};

	const renderAdvError = (index: number) => {
		let res: any = errors?.adv;
		if (!res) return "";
		res = res[`${index}`];
		if (!res) return "";
		res = res?.value;
		if (!res) return "";
		return res?.message ?? "";
	};

	return (
		<Form
			className="mt-5 pt-4"
			autoComplete="off"
			onSubmit={handleSubmit(onSubmit)}
		>
			<Form.Group className="form-2">
				<Form.Group className="mb-4">
					<Form.Label className={"form__label"}>Advantages</Form.Label>
					{fields.map((item: any, index: number) => (
						<Form.Group className="mb-2" key={item.id}>
							<div className=" d-flex gap-2 h-44">
								<Form.Control
									{...register(`adv.${index}.value`)}
									type="input"
									placeholder="..."
									className={"form__field"}
									id={`field-advantages-${index + 1}`}
								/>
								<Button
									className={"button-remove"}
									variant="link"
									id={`button-remove-${index + 1}`}
									onClick={() => handleDeleteAction(index)}
								/>
							</div>
							<span className="tip">{renderAdvError(index)}</span>
						</Form.Group>
					))}
					<Button
						className={"button-outlined plus"}
						variant="outline-primary"
						size="lg"
						id={`button-add`}
						onClick={handleAddAction}
					/>
				</Form.Group>

				<Form.Group className="mb-4">
					<Form.Label className="mb-0">Checkbox group</Form.Label>
					{checkboxFields.map((_: number, index: number) => (
						<Form.Check
							{...register(`checkbox.${index}.value`)}
							className="form__box"
							type="checkbox"
							label={index + 1}
							key={index}
							id={`field-checkbox-group-option-${index + 1}`}
						/>
					))}
				</Form.Group>

				<Form.Group className="mb-4">
					<Form.Label className="mb-0">Radio group</Form.Label>
					{[0, 1, 2].map((_: number, index: number) => (
						<Form.Check
							{...register("radio")}
							type="radio"
							className="form__box"
							label={index + 1}
							value={index}
							key={index}
							id={`field-radio-group-option-${index + 1}`}
						/>
					))}
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
