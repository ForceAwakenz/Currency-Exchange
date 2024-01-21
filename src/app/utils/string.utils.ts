import {
	BaseCurrencyRatesResponseType,
	CurrencyRateDisplayType,
} from '../shared/services/models/responses';
import { formatRateForDisplay } from './number.utils';

/**
 * @returns an array of 'EUR/UAH: 42.22' type of strings.
 */
export const composeExhangeRateString = (
	response: BaseCurrencyRatesResponseType,
	fractionDigits: number
): CurrencyRateDisplayType[] =>
	Object.entries(response.rates).reduce<CurrencyRateDisplayType[]>(
		(acc, curr) => [
			...acc,
			{
				[curr[0]]: `${curr[0]}/${response.base}: ${formatRateForDisplay(curr[1], fractionDigits)}`,
			},
		],
		[]
	);
