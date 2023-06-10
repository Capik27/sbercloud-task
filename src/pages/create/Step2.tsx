import { useAdvChange } from "hooks/useAdvChange";
import { useInputAction } from "hooks/useInputAction";
import { useStep } from "hooks/useStep";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { advType } from "store/formSlice";
import { useForm } from "react-hook-form";
import { SyntheticEvent, useEffect } from "react";

export function Step2() {
	const setStep = useStep();
	const handleInputAct = useInputAction();
	const setAdvChange = useAdvChange();

	const inputElems: advType[] = useSelector(
		(state: any) => state.form.data.adv
	);

	const returnObjRadio = () => {
		let radio: boolean | number | string = false;
		const obj: any = {};
		for (let index = 0; index < inputElems.length; index++) {
			obj[index] = {
				value: inputElems[index].value,
				checked: inputElems[index].checked,
			};
			if (inputElems[index].radio) {
				radio = String(index);
			}
		}
		return { ...obj, radio };
	};

	const defaultValues = returnObjRadio();

	const {
		register,
		handleSubmit,
		getValues,
		setValue,
		formState: { errors, isValid },
	} = useForm({
		mode: "onBlur",
		defaultValues,
	});

	const updStore = (data: any) => {
		let radioIndex = data.radio;
		for (let index = 0; index < data.length; index++) {
			let item = data[index];
			setAdvChange(index, "value", item.value);
			setAdvChange(index, "checked", item.checked);
			if (radioIndex === String(index)) {
				setAdvChange(index, "radio", true);
			} else {
				setAdvChange(index, "radio", false);
			}
		}
	};

	const saveDataToStore = (int: number = 0) => {
		const data = getValues();
		data.length = inputElems.length + int;
		// console.log("data", data);
		updStore(data);
	};

	const onSubmit = () => {
		saveDataToStore();
		setStep(2);
	};

	const handleBack = (e: SyntheticEvent) => {
		e.preventDefault();
		saveDataToStore();
		setStep(0);
	};

	useEffect(() => {
		setValue("radio", defaultValues.radio);
		for (let index = 0; index < inputElems.length; index++) {
			setValue(`${index}.value`, inputElems[index].value);
			setValue(`${index}.checked`, inputElems[index].checked);
		}
	}, [inputElems]);

	const handleAddAction = () => {
		saveDataToStore();
		handleInputAct("add");
	};

	const handleDeleteAction = (index: number) => {
		if (defaultValues.radio == index) setValue("radio", false);
		saveDataToStore(-1);
		handleInputAct("delete", index);
	};

	// console.log("watch", watch());
	// console.log("RENDER STEP 2");

	return (
		<Form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className="form-2">
				<Form.Group className="mb-4">
					<Form.Label className={"form__label"}>Advantages</Form.Label>
					{inputElems.map((_: advType, index: number) => (
						<Form.Group className="mb-4" key={index}>
							<div className=" d-flex gap-2">
								<Form.Control
									{...register(
										`${index}.value`
										// {
										// 	required: "Поле не должно быть пустым",
										// 	maxLength: {
										// 		value: 30,
										// 		message: "Максимально 30 символов!",
										// 	},
										// }
									)}
									autoComplete="off"
									type="input"
									placeholder="..."
									className={"form__field mb-1"}
									id={`field-advantages-${index + 1}`}
								/>
								<Button
									className={"button-remove"}
									variant="link"
									id={`button-remove-${index + 1}`}
									onClick={() => handleDeleteAction(index)}
								></Button>
							</div>
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

				{inputElems.length > 0 && (
					<>
						<Form.Group className="mb-4">
							<Form.Label className={"form__label"}>Chechbox group</Form.Label>
							{inputElems.map((_: advType, index: number) => (
								<Form.Check
									{...register(`${index}.checked`)}
									type="checkbox"
									label={index + 1}
									key={index}
									id={`field-checkbox-group-option-${index + 1}`}
								/>
							))}
						</Form.Group>

						<Form.Group className="mb-4">
							<Form.Label className={"form__label"}>Radio group</Form.Label>
							{inputElems.map((_: advType, index: number) => (
								<Form.Check
									{...register("radio")}
									type="radio"
									label={index + 1}
									value={index}
									key={index}
									id={`field-radio-group-option-${index + 1}`}
								/>
							))}
						</Form.Group>
					</>
				)}
			</Form.Group>
			{/* <pre>{JSON.stringify(inputElems, null, 2)}</pre> */}

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
