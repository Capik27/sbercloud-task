/**
 * Очистка от пробелов по краям и удаление длинных пробелов внутри
 */
export function getClearTextValue(value: string) {
	return value.trim().replace(/\s{2,}/g, " ");
}
