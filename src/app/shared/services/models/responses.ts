import { CurrencySymbolType } from '@src/app/shared/models/currency-symbols';

export type BaseCurrencyRatesResponseType = {
	date: Date;
	base: CurrencySymbolType;
	rates: {
		[K in CurrencySymbolType]: number;
	};
};

export type CurrencyRateDisplayType = {
	[Key in CurrencySymbolType]+?: string;
};

export type CurrencyResponseType = {
	id: number;
	name: string;
	short_code: CurrencySymbolType;
	code: string;
	precision: number;
	subunit: number;
	symbol: string;
	symbol_first: boolean;
	decimal_mark: string;
	thousands_separator: string;
};

export type ConversionResponseType = {
	timestamp: number;
	date: Date;
	from: CurrencySymbolType;
	to: CurrencySymbolType;
	amount: number;
	value: number;
};

// "160": {
//   "id": 161,
//   "name": "Zimbabwe Dollar",
//   "short_code": "ZWL",
//   "code": "932",
//   "precision": 2,
//   "subunit": 100,
//   "symbol": "$",
//   "symbol_first": true,
//   "decimal_mark": ".",
//   "thousands_separator": ","
// },
