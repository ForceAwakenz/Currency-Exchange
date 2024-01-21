const isNumber = (value: unknown): value is number => typeof value === 'number';

const fractionOf = (number: number): number | null =>
	isNumber(number) ? 1 / number : null;

const toFixed = (number: number | null, fractionDigits = 4): number | null =>
	isNumber(number) ? Number(number.toFixed(fractionDigits)) : null;

export const formatRateForDisplay = (
	number: number,
	fractionDigits: number
): number | string =>
	toFixed(fractionOf(number), fractionDigits) ?? 'Convertion error';

/**
 *
 * @returns just opposite value of initiator
 */
export const getTarget = (initiator: 1 | 2): 1 | 2 => (initiator === 1 ? 2 : 1);
