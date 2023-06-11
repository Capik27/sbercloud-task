import { SyntheticEvent } from "react";

/**
 * Функция проверки и создания телефонной маски
 */
export const telChange = (e: SyntheticEvent) => {
	const target = e.target as HTMLInputElement;
	const valueNumbers = target.value.replace(/\D/g, "");
	let formattedValue = "";

	//при отсутсвии цифр очищаем поле
	if (!valueNumbers) return (target.value = "");

	//находим позицию курсора в строке поля инпута
	const cursorPosition = target.selectionStart;

	//редактирование номера
	if (target.value.length !== cursorPosition) {
		if (valueNumbers.length > 11) {
			return (target.value = valueNumbers.substring(0, 11));
		}
		let ne = e.nativeEvent as InputEvent;
		if (ne.data && /\D/g.test(ne.data)) {
			target.value = valueNumbers;
			formatValueSetter();
		}
		return;
	}

	formatValueSetter();

	//Создание маски
	function formatValueSetter() {
		if (["7", "8", "9"].indexOf(valueNumbers[0]) > -1) {
			//добавляем код страны
			formattedValue = formattedValue + "7";

			//добавляем код города
			if (valueNumbers.length > 1) {
				const cityCode = valueNumbers.substring(1, 4);
				formattedValue = formattedValue + " (" + cityCode;
			}
			//добавляем первый блок номера
			if (valueNumbers.length >= 5) {
				const block1 = valueNumbers.substring(4, 7);
				formattedValue = formattedValue + ") " + block1;
			}
			//добавляем второй блок номера
			if (valueNumbers.length >= 8) {
				const block2 = valueNumbers.substring(7, 9);
				formattedValue = formattedValue + "-" + block2;
			}
			//добавляем последний блок номера
			if (valueNumbers.length >= 10) {
				const block3 = valueNumbers.substring(9, 11);
				formattedValue = formattedValue + "-" + block3;
			}
		} else {
			//не для РФ
			formattedValue = valueNumbers;
		}
		target.value = "+" + formattedValue;
	}
};

/**
 * Функция проверки вставок в телефонную маску
 */
export const telPaste = (e: any) => {
	const target = e.target as HTMLInputElement;
	const valueNumbers = target.value.replace(/\D/g, "");

	const cursorPosition = target.selectionStart ?? target.value.length;

	//находим объект с нашей вставочной строкой из буфера
	const pasted = e.clipboardData || window.Clipboard;

	//проверяем наличие выледения курсором
	const selection = window.getSelection()?.toString();
	console.log("selection", selection);

	if (pasted) {
		const pastedText = pasted.getData("Text");
		// если есть НЕ ЦИФРА или количество цифр равно лимиту, то возврат к дефолту
		if (/\D/g.test(pastedText) || valueNumbers.length === 11) {
			target.value = valueNumbers;
			return;
		}
		// если количество цифр меньше лимита
		if (valueNumbers.length < 11) {
			//получаем цифры до курсора
			const firstPartNumbers = target.value
				.substring(0, cursorPosition)
				.replace(/\D/g, "");
			//получаем цифры после курсора
			const secondPartNumbers = target.value
				.substring(cursorPosition, target.value.length)
				.replace(/\D/g, "");

			//определяем количество фри симолов в маске
			const pasteSymbolNumber = 11 - valueNumbers.length;

			// если вставляемая строка меньше, чем запас фри символов в маске, то игнор
			if (pasteSymbolNumber > pastedText.length) return;

			// вырезаем из буфера количество допустимых символов и вставляем в резалт
			const pasteSymbols = pastedText.substring(0, pasteSymbolNumber);
			target.value = firstPartNumbers + pasteSymbols + secondPartNumbers;
			return;
		}
	}
};

// export const telSelect = (e: SyntheticEvent) => {
// 	console.log(e.target);
// 	//
// };

// const inputElement = document.getElementById('my-input');
// const selection = window.getSelection().toString();
// const selectedIndex = inputElement.value.indexOf(selection);
// const selectedNumbers = inputElement.value.slice(selectedIndex, selectedIndex + selection.length);
