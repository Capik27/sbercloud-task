import { SyntheticEvent } from "react";
const TEL_PURE_LENGTH_LIMIT = 11;
// STATE
let LIMIT: boolean = false; // тру если длина достигла лимита
let STATE_VALUE: string = ""; // сохранение строки при достижении лимита
let CLIPBOARD_VALUE: string = ""; // сохранение зачения из буфера

/////////////////////////////////////////////////////////////////////////
// telChange Callback
/////////////////////////////////////////////////////////////////////////

/**
 * Функция проверки и создания телефонной маски
 */
export const telChange = (e: SyntheticEvent | any) => {
	const target = e.target as HTMLInputElement;
	let valueNumbers = target.value.replace(/\D/g, "");

	//при отсутсвии цифр очищаем поле
	if (!valueNumbers) return (target.value = "");

	//получаем вводный символ или вставочную строку
	const ne = e.nativeEvent as InputEvent;
	const data = ne.data ?? CLIPBOARD_VALUE;

	//находим позицию курсора в строке поля инпута
	const cursorPosition = target.selectionStart as number;
	const cursorEndPosition = (target.selectionEnd as number) + data.length;
	const selectionLength = cursorEndPosition - cursorPosition;

	//при неприемлимых символах и наличии выделения возвращаемся к стейту
	const isErrorSymbol: boolean = /\D/g.test(data);
	if (data && isErrorSymbol && selectionLength) {
		target.value = STATE_VALUE;
		convertValueToMask(target, target.value);
		setCursorPosition(target, cursorPosition - 1);
		return;
	}

	//при достижении лимита сохраняем значения во внешние переменные
	checkState(valueNumbers);

	//если происходит редактирование номера = курсор не в конце
	if (target.value.length !== cursorPosition) {
		// добавление символа и лимит достигнут или превышен
		if (data && valueNumbers.length >= TEL_PURE_LENGTH_LIMIT) {
			target.value = STATE_VALUE;
			convertValueToMask(target, target.value);
		} else {
			// добавление или удаление символа при не достигнутом лимите маски
			if (/\D/g.test(data)) {
				target.value = STATE_VALUE;
				convertValueToMask(target, target.value);
			} else {
				convertValueToMask(target, valueNumbers);
			}
			setCursorPosition(target, cursorPosition);
		}
		return;
	}

	convertValueToMask(target, valueNumbers);
};

/////////////////////////////////////////////////////////////////////////
// telPaste Callback
/////////////////////////////////////////////////////////////////////////

/**
 * Функция вставок из буфера в строку инпута
 */
export const telPaste = (e: any) => {
	const target = e.target as HTMLInputElement;
	const valueNumbers = target.value.replace(/\D/g, "");

	//проверяем наличие выледения курсором (индексы чистые)
	const { pureStartIndex, pureEndIndex, pureSelectionLength } =
		getPureSelections(target);

	//находим позиции курсора в строке поля инпута
	const cursorStartPosition = target.selectionStart as number;
	const cursorEndPosition = target.selectionEnd as number;

	//находим объект с нашей вставочной строкой из буфера
	const pasted = e.clipboardData;

	if (pasted) {
		const pastedText = pasted.getData("Text");
		CLIPBOARD_VALUE = pastedText;

		//если вставляется пустое значение ""
		if (!pastedText) {
			// setCursorPosition(target, cursorStartPosition);
			return;
		}
		//если есть НЕ ЦИФРА
		if (/\D/g.test(pastedText)) {
			target.value = valueNumbers;
			return;
		}

		//определяем количество свободных символов в маске
		const pasteFreeSymbolNumber = TEL_PURE_LENGTH_LIMIT - valueNumbers.length;

		//получаем сумму свободных и выделенных слотов в маске
		const freeSlots = pasteFreeSymbolNumber + pureSelectionLength;

		// если вставляемая строка меньше, чем запас фри символов в маске, то игнор
		if (freeSlots > pastedText.length) return;

		//получаем цифры до курсора или начала выделения
		const firstPartNumbers = target.value
			.substring(0, cursorStartPosition)
			.replace(/\D/g, "");
		//получаем цифры после курсора или конца выделения
		const secondPartNumbers = target.value
			.substring(
				pureStartIndex === pureEndIndex
					? cursorStartPosition
					: cursorEndPosition,
				target.value.length
			)
			.replace(/\D/g, "");

		// вырезаем из буфера количество допустимых символов и вставляем в резалт
		const pasteSymbols = pastedText.substring(0, freeSlots);

		const result = firstPartNumbers + pasteSymbols + secondPartNumbers;
		target.value = result;

		//при достижении лимита сохраняем значения во внешние переменные
		checkState(valueNumbers);
		return;
	}
};

/**
 * Функция навешивания маски на инпут
 *  @element : target элемент инпута
 *  @strNumbers : строка с числами
 */
function convertValueToMask(element: HTMLInputElement, strNumbers: string) {
	element.value = getMask(strNumbers);
}

/**
 * Функция создания маски
 *  @strNumbers : строка с числами
 * 	@return foramtted string
 */
export function getMask(strNumbers: string) {
	let formattedValue = "";
	if (["7", "8", "9"].indexOf(strNumbers[0]) > -1) {
		//добавляем код страны
		formattedValue = formattedValue + "7";

		//добавляем код города
		if (strNumbers.length > 1) {
			const cityCode = strNumbers.substring(1, 4);
			formattedValue = formattedValue + " (" + cityCode;
		}
		//добавляем первый блок номера
		if (strNumbers.length >= 5) {
			const block1 = strNumbers.substring(4, 7);
			formattedValue = formattedValue + ") " + block1;
		}
		//добавляем второй блок номера
		if (strNumbers.length >= 8) {
			const block2 = strNumbers.substring(7, 9);
			formattedValue = formattedValue + "-" + block2;
		}
		//добавляем последний блок номера
		if (strNumbers.length >= 10) {
			const block3 = strNumbers.substring(9, 11);
			formattedValue = formattedValue + "-" + block3;
		}
	} else {
		//не для РФ
		formattedValue = strNumbers;
	}
	return "+" + formattedValue;
}

/**
 * Функция проверки стейта
 */
function checkState(strNumbers: string) {
	if (strNumbers.length === TEL_PURE_LENGTH_LIMIT) {
		LIMIT = true;
		STATE_VALUE = strNumbers;
	} else if (strNumbers.length < TEL_PURE_LENGTH_LIMIT) {
		if (LIMIT) LIMIT = false;
		STATE_VALUE = strNumbers;
	}
}

/**
 * Функция смещения курсора на элементе
 */
function setCursorPosition(element: HTMLInputElement, position: number = 0) {
	element.selectionStart = position;
	element.selectionEnd = position;
}

type pureSelResultsType = {
	pureStartIndex: number;
	pureEndIndex: number;
	pureSelectionLength: number;
};

/**
 * Функция получения чистых индексов при выделении
 * @return { pureStartIndex, pureEndIndex, pureSelectionLength }
 */
function getPureSelections(element: HTMLInputElement): pureSelResultsType {
	//проверяем наличие выледения курсором (индексы чистые)
	const pureStartIndex = element.value
		.substring(0, element.selectionStart as number)
		.replace(/\D/g, "").length;
	const pureEndIndex = element.value
		.substring(0, element.selectionEnd as number)
		.replace(/\D/g, "").length;
	//определяем чистую длину выделения
	const pureSelectionLength = pureEndIndex - pureStartIndex;
	return { pureStartIndex, pureEndIndex, pureSelectionLength };
}
