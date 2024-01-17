const isNumber = (value: unknown): value is number => typeof value === 'number';

const fractionOf = (number: number): number | null => (isNumber(number) ? 1 / number : null);

const toFixed = (number: number | null, fractionDigits = 4): number | null =>
	isNumber(number) ? Number(number.toFixed(fractionDigits)) : null;

export const formatRateForDisplay = (number: number): number | string =>
	toFixed(fractionOf(number)) ?? 'Convertion error';
