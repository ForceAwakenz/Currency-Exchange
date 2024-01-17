export const CURRENCY_SYMBOLS = {
	USD: 'US Dollar',
	EUR: 'Euro',
	JPY: 'Japanese Yen',
	GBP: 'British Pound',
	AUD: 'Australian Dollar',
	CAD: 'Canadian Dollar',
	CHF: 'Swiss Franc',
	CNY: 'Chinese Yuan',
	SEK: 'Swedish Krona',
	NZD: 'New Zealand Dollar',
	KRW: 'South Korean Won',
	SGD: 'Singapore Dollar',
	NOK: 'Norwegian Krone',
	MXN: 'Mexican Peso',
	HKD: 'Hong Kong Dollar',
	TRY: 'Turkish Lira',
	INR: 'Indian Rupee',
	BRL: 'Brazilian Real',
	ZAR: 'South African Rand',
	AED: 'United Arab Emirates Dirham',
	UAH: 'Ukrainian Hryvnia',
} as const;

export type CurrencySymbolType = keyof typeof CURRENCY_SYMBOLS;