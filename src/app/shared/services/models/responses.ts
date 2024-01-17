import { CurrencySymbolType } from '@app/shared/modles/currency-symbols';

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
