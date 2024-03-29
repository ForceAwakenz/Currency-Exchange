export const CURRENCY_SYMBOLS = {
	USD: 'USD',
	EUR: 'EUR',
	JPY: 'JPY',
	GBP: 'GBP',
	AUD: 'AUD',
	CAD: 'CAD',
	CHF: 'CHF',
	CNY: 'CNY',
	SEK: 'SEK',
	NZD: 'NZD',
	KRW: 'KRW',
	SGD: 'SGD',
	NOK: 'NOK',
	MXN: 'MXN',
	HKD: 'HKD',
	TRY: 'TRY',
	INR: 'INR',
	BRL: 'BRL',
	ZAR: 'ZAR',
	AED: 'AED',
	UAH: 'UAH',
} as const;

export type CurrencySymbolType = keyof typeof CURRENCY_SYMBOLS;
