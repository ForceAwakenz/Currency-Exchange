import { CurrencySymbolType } from '../../models/currency-symbols';

export const DEFAULT_EXCHANGE_CURRENCIES = ['EUR', 'USD'] as const;
export const DEFAULT_CONVERSION_CURRENCIES = ['EUR', 'USD', 'GBP'] as const;
export const DEFAULT_BASE_CURRENCY: CurrencySymbolType = 'UAH' as const;
